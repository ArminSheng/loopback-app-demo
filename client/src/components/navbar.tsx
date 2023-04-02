import { fetcher } from "@/common";
import { Roles } from "@/data";
import useUser from "@/data/use-user";
import Link from "next/link";
import { useCallback } from "react";

export function Navbar() {
  const { user, mutateUser } = useUser();
  const logout = useCallback(() => {
    fetcher.post("api/logout").then(mutateUser);
  }, [mutateUser]);

  if (!user || !user.isLoggedIn) return null;

  return (
    <>
      <header className="bg-transparent border-gray-300/70 relative border-b">
        <nav className="flex items-center h-20 px-4 mx-auto max-w-5xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            <div className="">
              <Link
                href={"/home"}
                className="px-3 py-1 font-medium text-md text-label-1 dark:text-dark-label-1 transition duration-300 ease-in-out hover:text-red-700"
              >
                Home
              </Link>
              <Link
                href={"/book"}
                className="px-3 py-1 font-medium text-md text-label-1 dark:text-dark-label-1 transition duration-300 ease-in-out hover:text-red-700"
              >
                Book
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <span className="mr-4 text-black">
                Hi {user.role === Roles.ADMIN ? "Admin" : "Guest"}
              </span>
              <div className="cursor-pointer text-gray-500" onClick={logout}>
                Logout
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
