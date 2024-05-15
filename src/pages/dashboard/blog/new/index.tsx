import SessionProvider from "@/components/SessionProvider";
import BlogEditor from "@/components/blog/BlogEditor";
import Container from "@/components/shared/Container";
import TitleWithBackButton from "@/components/shared/TitleWithBackButton";
import { getSession } from "@/lib/functions/getSession";
import type { GetServerSidePropsContext } from "next";

export default function New() {
    return (
        <>
            <SessionProvider>
                <Container>
                    <TitleWithBackButton backUrl="/dashboard/blog" text="Yeni Blog Ekle" />
                    <BlogEditor />
                </Container>
            </SessionProvider>
        </>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx);
    if (!session.success) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    console.log(session);


    return {
        props: {},
    };
}