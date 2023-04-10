import { NextRouter } from "next/router";
import Cookie from "js-cookie";

export const logout = async (router: NextRouter) => {
    await fetch("/api/auth/logout").then((res) => res.json());
    Cookie.remove("token");
    router.push("/login");
};