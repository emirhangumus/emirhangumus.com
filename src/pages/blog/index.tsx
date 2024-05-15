import BlogContent from "@/components/blog/BlogContent";
import Pagination from "@/components/blog/Pagination";
import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";
import { PostInterfaceWithPagination } from "@/interfaces/PostInterface";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import router from "next/router";

export default function Blog({ data }: { data: PostInterfaceWithPagination }) {
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
                        <BlogContent posts={data.posts} />
                    </div>
                    <div className="mt-4">
                        <p className="text-center text-gray-300 mb-2">
                            Toplam <span
                                className="text-white font-bold"
                            >{data.total}</span> yazı bulundu.
                        </p>
                        <Pagination
                            current={data.page}
                            total={data.total}
                            limit={data.limit}
                            callback={(page: string) => {
                                router.push(`/blog?page=${page}`)
                            }}
                        />
                    </div>
                </div>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    const page = ctx.query.page || 1
    const limit = 10

    if (Number(page) < 1) {
        return {
            redirect: {
                destination: '/blog?page=1',
                permanent: false
            }
        }
    }

    const skip = (Number(page) - 1) * limit

    const posts = await fetch(`${process.env.BASE_URL}/api/blog/flow?skip=${skip}&limit=${limit}`)
        .then(res => res.json())

    if (!posts || !posts.data || !posts.success) {
        return {
            props: {
                data: null
            }
        }
    }

    return {
        props: {
            data: posts.data
        }
    }
}
