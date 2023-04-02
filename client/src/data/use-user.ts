import { setAppToken } from "@/common";
import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { Roles } from "./types";

export interface User {
  id?: string;
  role?: Roles;
  email: string;
  username?: string;
  contact?: string;
  isLoggedIn?: boolean;
  token?: string;
}

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data, mutate: mutateUser } = useSWR<{ data: User }>("/api/user");
  const user = data?.data;

  useEffect(() => {
    setAppToken(user?.token!);
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
