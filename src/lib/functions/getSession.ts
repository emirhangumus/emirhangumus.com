import { log } from "console";
import type { GetServerSidePropsContext } from "next/types";

interface Session {
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    token: string;
};

interface SessionResponse extends Session {
    success: boolean;
    message: string;
};

const parseCookies = (cookiesString: string) => {
    return cookiesString.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key.trim()] = decodeURIComponent(value);
        return acc;
    }, {} as { [key: string]: string });
}

export async function getSession(ctx: GetServerSidePropsContext) {
    let g = ctx.req.headers.cookie;

    if (!g) {
        return {
            success: false,
            message: "No authorization header found",
        }
    }

    let h = parseCookies(g);

    if (!h?.token) {
        return {
            success: false,
            message: "No authorization header found",
        }
    }

    let r = await fetch(`${process.env.BASE_URL}/api/auth/session`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: h?.token || "",
        },
        credentials: "include",
    }).then((res) => res.json());

    return r as SessionResponse;
}