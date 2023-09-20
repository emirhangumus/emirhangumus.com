import SessionProvider from "@/components/SessionProvider";
import BlogEditor from "@/components/blog/BlogEditor";
import Container from "@/components/shared/Container";
import TitleWithBackButton from "@/components/shared/TitleWithBackButton";
import { PostInterface } from "@/interfaces/PostInterface";
import { getSession } from "@/lib/functions/getSession";
import type { GetServerSidePropsContext } from "next";

type Props = {
    post: PostInterface;
};

export default function Edit({ post }: Props) {
    return (
        <>
            <SessionProvider>
                <Container>
                    <TitleWithBackButton backUrl="/dashboard/blog" text="Blog Yazısı Düzenle" />
                    <BlogEditor data={post} />
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

    const slug = ctx.params?.slug;

    if (!slug) {
        return {
            redirect: {
                destination: "/dashboard/blog",
                permanent: false,
            },
        };
    }

    let post = await fetch(`${process.env.BASE_URL}/api/blog/edit/${slug}`).then((res) => res.json());

    if (!post || !post.data || !post.success) {
        return {
            redirect: {
                destination: "/dashboard/blog",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            post: post.data,
        },
    };
}