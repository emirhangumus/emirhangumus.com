import { RenderContent } from "@/components/blog/RenderContent";
import Container from "@/components/shared/Container";
import { PostInterface } from "@/interfaces/PostInterface";
import imageUrl from "@/lib/functions/imageUrl";
import type { DataProp } from "editorjs-blocks-react-renderer";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

type BlogPostProps = {
    post: PostInterface;
};

export default function BlogPost({ post }: BlogPostProps) {
    const title = `${post.title.trim()} | Emirhan Gümüş`;

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Container>
                <div className="flex flex-col gap-4 max-w-2xl mx-auto mb-8">
                    <h1 className="md:text-3xl text-lg font-bold flex md:flex-row flex-col justify-between items-center">
                        <span className="flex-1 block">
                            {post.title}
                        </span>
                        <span className="text-sm text-gray-500 block md:mt-0 mt-2">
                            {new Date(post.created_at).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </h1>
                    <div className="aspect-video h-full w-full mx-auto relative rounded-lg overflow-hidden">
                        <Image
                            src={imageUrl(post.image.image_url)}
                            alt={post.title}
                            fill={true}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    {post.tags ? (
                        <div className="flex gap-2">
                            {post.tags.map(tag => (
                                <Link key={tag.slug} href={`/blog/etiket/${tag.slug}`} className="bg-cinder-900 text-white px-2 text-xs py-1 rounded-lg">
                                    <span className="mr-1">#</span>
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                    <article className="blockRenderer flex flex-col">
                        <RenderContent data={post.content as DataProp} />
                    </article>
                </div>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const slug = ctx.params?.slug;
    if (!slug) {
        return {
            props: {
                post: null
            }
        }
    }
    const post = await fetch(`${process.env.BASE_URL}/api/blog/slug/${slug}`)
        .then(res => res.json())

    if (!post || !post.data || !post.success) {
        return {
            redirect: {
                destination: "/404",
                permanent: false
            }
        }
    }

    return {
        props: {
            post: post.data
        }
    }
}