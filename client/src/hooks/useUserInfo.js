import { useCookies } from "react-cookie";

function useUserInfo() {
  const [cookies, setCookie] = useCookies(["userInfo"]);
  const userInfo = cookies["userInfo"] || {};
  userInfo["isLoggedIn"] = !userInfo["token"];
  return [
    userInfo,
    (obj) => typeof obj === "object" && setCookie("userInfo", obj),
  ];
}

export default useUserInfo;
