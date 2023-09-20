import BlogContent from "@/components/blog/BlogContent";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import Text from "@/components/shared/Text";
import { PostInterface } from "@/interfaces/PostInterface";
import { TagInterface } from "@/interfaces/TagInterface";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function Etiket({ posts, tag }: { posts: PostInterface[], tag: TagInterface }) {
    const title = `#${tag.name.trim()} | Emirhan Gümüş`;
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Container>
                <Text level="h1">
                    {'#' + tag.name}
                </Text>
                <Text className="text-cinder-500 my-2">
                    <span className="bg-cinder-900 px-2 inline-block rounded">
                        {'#' + tag.name}
                    </span>
                    {' '}
                    etiketli <span className="bg-cinder-900 px-2 inline-block rounded">{posts.length}</span> yazı bulundu.
                </Text>
                <Divider removeBorder={true} />
                <BlogContent posts={posts} />
            </Container >
        </>
    );
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const slug = ctx.params?.tag_slug;
    if (!slug) {
        return {
            props: {
                posts: null
            }
        }
    }

    const posts = await fetch(`${process.env.BASE_URL}/api/blog/tags/getPostsByTagSlug?tagSlug=${slug}`)
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
            posts: posts.data.posts,
            tag: posts.data.tag
        }
    }
}