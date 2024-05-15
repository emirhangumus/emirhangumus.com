import Container from "@/components/shared/Container";
import DecoratedBox from "@/components/shared/DecoratedBox";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atoms/userAtom";
import Head from "next/head";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isInputFilled, setIsInputFilled] = useState<boolean>(false);

    const [user, setUser] = useAtom(userAtom);

    useEffect(() => {
        if (email.length > 0 && password.length > 0) {
            setIsInputFilled(true);
        } else {
            setIsInputFilled(false);
        }
    }, [email, password]);

    const handleSubmit = async () => {
        let data = {
            email,
            password
        }

        let response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();

        if (result.success) {
            Cookie.set("token", result.token);
            Cookie.set("imageToken", result.imageToken);

            setUser({
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                role: result.user.role
            });
            router.push("/dashboard");
        } else {
            alert(result.message);
        }
    }

    return (
        <>
            <Head>
                <title>Giriş Yap | Emirhan Gümüş</title>
            </Head>
            <Container className="max-w-lg">
                <DecoratedBox className="py-8">
                    <h1 className="lg:text-4xl text-3xl font-bold">Giriş Yap</h1>

                    <form className="flex flex-col gap-4 py-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">E-posta</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" id="email" name="email" className="w-full border border-cinder-600 rounded-md p-2 text-cinder-100 bg-transparent outline-none" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Şifre</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" name="password" className="w-full border border-cinder-600 rounded-md p-2 text-cinder-100 bg-transparent outline-none" />
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="disabled:bg-cinder-600 disabled:border-transparent disabled:cursor-not-allowed disabled:text-zinc-500 bg-cinder-100 text-zinc-900 rounded-md p-2"
                            disabled={!isInputFilled}
                        >
                            Giriş Yap
                        </button>
                    </form>
                </DecoratedBox>
            </Container>
        </>
    )
}