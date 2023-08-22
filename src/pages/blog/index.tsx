import BlogContent from "@/components/blog/BlogContent";
import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";
import { PostInterface } from "@/interfaces/PostInterface";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function Blog({ posts }: { posts: PostInterface[] }) {
    return (
        <>
            <Head>
                <title>Blog | Emirhan Gümüş</title>
            </Head>
            <Container>
                <div className="flex flex-col gap-2">
                    <Text level="h1">Blog</Text>
                    <Text>
                        Kendimce bir şeyler yazıyorum işte. ✍️
                    </Text>
                    <hr />
                    <div className="mt-4">
                        <BlogContent posts={posts} />
                    </div>
                </div>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

	const posts = await fetch(`${process.env.BASE_URL}/api/blog/flow`)
        .then(res => res.json())

    if (!posts || !posts.data || !posts.success) {
        return {
            props: {
                post: null
            }
        }
    }

    return {
        props: {
            posts: posts.data
        }
    }
}
