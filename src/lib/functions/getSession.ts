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


export async function getSession(ctx: GetServerSidePropsContext) {
    let g = ctx.req.headers.cookie?.split('=');

    // map it value pair with odd index as key and even index as value with typescript
    let h = g?.reduce((acc, val, i) => {
        if (g === undefined) return ({} as { [key: string]: string });
        if (i % 2 === 0) {
            acc[val] = g[i + 1];
        }
        return acc;
    }, {} as { [key: string]: string });

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