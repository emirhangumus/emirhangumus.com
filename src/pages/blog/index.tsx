import BlogContent from "@/components/blog/BlogContent";
import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";
import { PostInterface } from "@/interfaces/PostInterface";
import type { GetServerSidePropsContext } from "next";

export default function Blog({ posts }: { posts: PostInterface[] }) {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-2">
                    <Text level="h1">Blog</Text>
                    <Text>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae sapiente facilis cupiditate nesciunt, illum iusto fuga ducimus cum autem error, nostrum possimus minus ab delectus eveniet? Dolores corporis vero natus expedita corrupti dolorum numquam vitae minus, quos quasi, eaque architecto.
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
    const posts = await fetch(`${process.env.BASE_URL}/api/blog`)
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