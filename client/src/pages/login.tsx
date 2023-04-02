import { fetcher, setAppToken } from "@/common";
import useUser from "@/data/use-user";
import { useRouter } from "next/router";
import {
  useState,
  useCallback,
  FormEvent,
  MouseEvent,
  ChangeEvent,
} from "react";

enum PageScenes {
  signIn = 0,
  signUp = 1,
  resetSecret = 2,
}

function useOnInput(onClick: (val: string) => void) {
  const [input, setInput] = useState("");
  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.currentTarget.value);
      onClick(e.currentTarget.value);
    },
    [onClick]
  );

  return [input, onInput] as const;
}

export default function GuestLogin() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const [pageState, setPageState] = useState(PageScenes.signIn);
  const goSignUp = useCallback(() => {
    setPageState(PageScenes.signUp);
  }, []);

  const [email, onEmail] = useOnInput(() => {});

  const [password, onPassword] = useOnInput(() => {});

  const isError = email === "";
  // const onEmailInput = useCallback(() => {
  // }, []);

  const goSignIn = useCallback(() => {
    setPageState(PageScenes.signIn);
  }, []);

  const goReset = useCallback(() => {
    setPageState(PageScenes.resetSecret);
  }, []);

  const { mutateUser } = useUser({
    redirectTo: "/home",
    redirectIfFound: true,
  });

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (pageState === PageScenes.signIn) {
        const data = await fetcher
          .post("/api/login", {
            email,
            password,
          })
          .then((res) => {
            return res.data;
          });
        console.log({ q: data });
        mutateUser(data);
      }
    },
    [email, mutateUser, pageState, password]
  );

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          BookIt
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={onEmail}
                />
              </div>
            </div>

            {pageState === PageScenes.signUp && (
              <div>
                <label
                  htmlFor="nickname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nick Name
                </label>
                <div className="mt-1">
                  <input
                    id="nickname"
                    name="nickname"
                    type="string"
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            {pageState === PageScenes.resetSecret ? (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={onPassword}
                  />
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                // onClick={onSubmit}
              >
                {pageState === PageScenes.signIn && "Sign In"}
                {pageState === PageScenes.signUp && "Sign Up"}
                {pageState === PageScenes.resetSecret && "Update Password"}
              </button>
            </div>
          </form>

          <div className="mt-3 flex justify-between text-sm">
            {(pageState === PageScenes.signIn ||
              pageState === PageScenes.resetSecret) && (
              <span
                onClick={goSignUp}
                className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </span>
            )}
            {pageState === PageScenes.signIn && (
              <span
                onClick={goReset}
                className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </span>
            )}
            {(pageState === PageScenes.resetSecret ||
              pageState === PageScenes.signUp) && (
              <span
                onClick={goSignIn}
                className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
              >
                Back to login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
