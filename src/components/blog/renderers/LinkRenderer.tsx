import type { Block, RenderFn } from "editorjs-blocks-react-renderer"
import Link from "next/link"
import Image from "next/image"

type LinkMetaData = {
    name: string,
    property: string,
    content: string
}

type LinkData = {
    link: string,
    meta: {
        title?: string,
        description?: string,
        image?: {
            url: string
        },
        meta?: LinkMetaData[]
    }
}

export const LinkRenderer: RenderFn<LinkData> = ({ data, className = "" }) => {
    return (
        <>
            <Link
                href={data.link}
                target="_blank"
                className={`flex flex-col bg-zinc-900 p-2 rounded-lg mb-4 gap-2 relative ${className}`}
                rel="noopener noreferrer"
            >
                {data.meta.title && (
                    <span className="text-xl font-bold relative z-10">{data.meta.title}</span>
                )}
                {data.meta.description && (
                    <span className="text-sm text-cinder-300 relative z-10">{
                        // max length of 400 characters
                        data.meta.description.length > 120
                            ? data.meta.description.substring(0, 120) + "..."
                            : data.meta.description
                    }</span>
                )}
                {data.meta.image && (
                    <div
                        className="absolute inset-0 w-full h-full object-cover rounded-lg bg-zinc-900 opacity-40"
                    >
                        <img
                            src={data.meta.image.url}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            alt={data.meta.title || data.meta.description || "Link image"}
                        />
                    </div>
                )}
            </Link>
        </>
    )
}