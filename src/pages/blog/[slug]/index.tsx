import Container from "@/components/shared/Container";
import { PostInterface } from "@/interfaces/PostInterface";
import { GetServerSidePropsContext } from "next";
import Blocks from 'editorjs-blocks-react-renderer';
import type { DataProp } from 'editorjs-blocks-react-renderer';
import Image from "next/image";
import { CodeBlockRenderer } from "@/components/blog/CodeBlockRenderer";
import Link from "next/link";

type BlogPostProps = {
    post: PostInterface;
};

const defaultConfigs = {
    code: {
        className: ""
    },
    delimiter: {
        className: ""
    },
    embed: {
        className: "",
        rel: "noreferer nofollower external", // Generates an <a> if not able to receive an "embed" property
        sandbox: undefined
    },
    header: {
        className: ""
    },
    image: {
        className: "",
        actionsClassNames: {
            stretched: "image-block--stretched",
            withBorder: "image-block--with-border",
            withBackground: "image-block--with-background",
        }
    },
    list: {
        className: ""
    },
    paragraph: {
        className: ""
    },
    quote: {
        className: "",
        actionsClassNames: {
            alignment: "text-align-center", // This is a substitution placeholder: left or center.
        }
    },
    table: {
        className: ""
    }
}

export default function BlogPost({ post }: BlogPostProps) {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4 max-w-2xl mx-auto mb-8">
                    <h2 className="md:text-3xl text-lg font-bold flex md:flex-row flex-col justify-between items-center">
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
                    </h2>
                    <div className="aspect-video h-full w-full mx-auto relative rounded-lg overflow-hidden">
                        <Image
                            src={post.image.image_url}
                            alt={post.title}
                            fill={true}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    {post.tags ? (
                        <div className="flex gap-2">
                            {post.tags.map(tag => (
                                <Link href={`/blog/etiket/${tag.slug}`} className="bg-cinder-900 text-white px-2 text-xs py-1 rounded-lg">{tag.name}</Link>
                            ))}
                        </div>
                    ) : null}
                    <div className="blockRenderer flex flex-col">
                        <Blocks data={post.content as DataProp} config={defaultConfigs} renderers={{
                            codeBox: CodeBlockRenderer
                        }} />
                    </div>
                </div>
            </Container >
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
            props: {
                post: null
            }
        }
    }

    return {
        props: {
            post: post.data
        }
    }
}