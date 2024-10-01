import { serialize } from "cookie";

const prepareCookie = (token: string) => {
  return serialize("jwt_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
};

export default prepareCookie;
