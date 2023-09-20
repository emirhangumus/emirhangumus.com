import SessionProvider from "@/components/SessionProvider";
import NewAniForm from "@/components/forms/NewAniForm";
import Container from "@/components/shared/Container";
import TitleWithBackButton from "@/components/shared/TitleWithBackButton";
import { getSession } from "@/lib/functions/getSession";
import type { GetServerSidePropsContext } from "next";

export default function New() {
    return (
        <>
            <SessionProvider>
                <Container>
                    <TitleWithBackButton backUrl="/dashboard/anilar" text="Yeni Anı Ekle" />
                    <NewAniForm />
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