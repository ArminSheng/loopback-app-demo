import Cookies from "js-cookie";

export const getAppToken = () => {
  return Cookies.get("__appToken__") || "";
};

export const setAppToken = (val: string) => {
  return Cookies.set("__appToken__", val);
};

// remove app token when logout
export const removeAppToken = () => {
  Cookies.remove("__appToken__");
};
