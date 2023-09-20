import SessionProvider from "@/components/SessionProvider";
import AniCard from "@/components/ani/AniCard";
import BlogCard from "@/components/blog/BlogCard";
import Container from "@/components/shared/Container";
import Divider from "@/components/shared/Divider";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Text from "@/components/shared/Text";
import TitleWithBackButton from "@/components/shared/TitleWithBackButton";
import { PostInterface } from "@/interfaces/PostInterface";
import { getSession } from "@/lib/functions/getSession";
import Cookies from "js-cookie";
import Link from "next/link";
import type { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";

export default function Blog() {

    const [posts, setPosts] = useState<PostInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/blog', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': Cookies.get('token') || ''
                }
            })
            const data = await res.json()
            setPosts(data.data)
            setLoading(false)
        }
        fetchPosts()
    }, [])

    const deletePostCB = (from: string = "", data: { id: number }) => {
        if (from == 'delete') {
            setPosts(posts.filter(post => post.id !== data.id))
        }
    }

    return (
        <>
            <SessionProvider>
                <Container>
                    <TitleWithBackButton backUrl="/dashboard" text="Blog" />
                    <div className="flex gap-4 mt-4">
                        <Link href={`/dashboard/blog/new`} className="bg-cinder-800 hover:bg-cinder-900 px-4 py-0.5 rounded">
                            <Text>Yeni Yazı</Text>
                        </Link>
                    </div>
                    <div className="my-4">
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="flex flex-col">
                                {posts.map((post, index) => (
                                    <div key={index}>
                                        <BlogCard post={post} availableButtons={true} callback={deletePostCB} />
                                        {index !== posts.length - 1 && (
                                            <Divider />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
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