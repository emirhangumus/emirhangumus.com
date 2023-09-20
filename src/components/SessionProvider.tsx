import { appLoadingAtom } from "@/lib/atoms/appLoadingAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { userAtom } from "@/lib/atoms/userAtom";
import AppLoadingScreen from "./AppLoadingScreen";

export default function SessionProvider({ children }: { children: React.ReactNode }) {

    const [appLoading, setAppLoading] = useAtom(appLoadingAtom);
    const [user, setUser] = useAtom(userAtom);
    const token = Cookie.get("token");

    useEffect(() => {
        if (!token) {
            setAppLoading({ loading: false, message: "" });
        } else {
            setAppLoading({ loading: true, message: "Checking session" });
            fetch("/api/auth/session", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'token': token
                },
                credentials: "include"
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setUser({
                            id: data.user.id,
                            name: data.user.name,
                            email: data.user.email,
                            role: data.user.role,
                        });
                        setAppLoading({ loading: false, message: "" });
                    } else {
                        setAppLoading({ loading: false, message: "" });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setAppLoading({ loading: false, message: "" });
                });
        }
    }, []);


    return (
        <>
            {appLoading.loading ? <AppLoadingScreen /> : children}
        </>
    )
}