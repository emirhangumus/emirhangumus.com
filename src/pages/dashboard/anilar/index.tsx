import SessionProvider from "@/components/SessionProvider";
import AniCard from "@/components/ani/AniCard";
import Container from "@/components/shared/Container";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Text from "@/components/shared/Text";
import TitleWithBackButton from "@/components/shared/TitleWithBackButton";
import { Ani } from "@/interfaces/AniInterface";
import { getSession } from "@/lib/functions/getSession";
import Cookies from "js-cookie";
import Link from "next/link";
import type { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";

export default function Anilar() {

    const [loading, setLoading] = useState(true)
    const [anilar, setAnilar] = useState<Ani[]>([])



    useEffect(() => {
        const fetchAnilar = async () => {
            const res = await fetch('/api/anilar')
            const data = await res.json()
            if (data.success) {
                setAnilar(data.data)
                setLoading(false)
            } else {
                console.log(data)
            }
        }
        fetchAnilar()
    }, [])

    const deleteAni = async (id: number) => {
        const res = await fetch(`/api/anilar?moment_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': Cookies.get('token') || '',
            }
        })
        const data = await res.json()
        if (data.success) {
            setAnilar(anilar.filter(ani => ani.id !== id))
        } else {
            console.log(data)
        }
    }

    return (
        <>
            <SessionProvider>
                <Container>
                    <div>
                        <TitleWithBackButton backUrl="/dashboard" text="Anılar" />
                        <div className="flex gap-4 mt-4">
                            <Link href={`/dashboard/anilar/new`} className="bg-cinder-800 hover:bg-cinder-900 px-4 py-0.5 rounded">
                                <Text>Yeni Anı Yükle</Text>
                            </Link>
                        </div>
                        <div className="mt-4">
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                                    {anilar.map((ani) => (
                                        <div className="p-4 rounded-lg bg-cinder-900" key={ani.id}>
                                            <div>
                                                <button className="bg-red-800 hover:bg-red-900 px-4 py-0.5 rounded" onClick={() => deleteAni(ani.id)}>
                                                    <Text>Sil</Text>
                                                </button>
                                            </div>
                                            <AniCard key={ani.id} ani={ani} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </SessionProvider>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    if (!session.success) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}