import { PostInterface } from "@/interfaces/PostInterface";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import Switch from "../shared/Switch";
import imageUrl from "@/lib/functions/imageUrl";

type BlogCardProps = {
    post: PostInterface;
    availableButtons?: boolean;
    callback?: (from?: string, data?: any) => void;
};

export default function BlogCard({ post, availableButtons, callback }: BlogCardProps) {

    const deletePost = async () => {
        const res = await fetch(`/api/blog?blog_id=${post.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': Cookies.get('token') || '',
            }
        })
        const data = await res.json()

        if (data.success) {
            callback && callback('delete', { id: post.id })
        } else {
            callback && callback('error', { id: post.id })
        }
    }

    return (
        <>
            <Link href={`/blog/${post.slug}`} className="flex flex-col gap-2 hover:bg-cinder-950 hover:bg-opacity-30 border border-transparent hover:border-cinder-900 transition-all rounded-lg cursor-pointer overflow-hidden p-1">
                <div className="flex md:flex-row flex-col gap-2 items-stretch">
                    <div className="relative md:aspect-square md:h-24 md:w-24 aspect-video w-full rounded-md overflow-hidden">
                        <Image
                            src={imageUrl(post.image.image_url)}
                            alt={post.title}
                            fill={true}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">{post.title}</h2>
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        </div>
                    </div>

                </div>
            </Link>
            {availableButtons && (
                <div className="flex gap-2 mt-4">
                    <Link href={`/dashboard/blog/${post.slug}/edit`} className="bg-blue-800 hover:bg-blue-900 px-4 py-0.5 rounded">
                        <p className="text-sm">Düzenle</p>
                    </Link>
                    <button className="bg-red-800 hover:bg-red-900 px-4 py-0.5 rounded" onClick={async () => await deletePost()}>
                        <p className="text-sm">Sil</p>
                    </button>
                    <Switch isActive={post.status === "PUBLISHED"} callback={async (state) => {
                        const res = await fetch(`/api/blog/status?blog_id=${post.id}&status=${state ? "PUBLISHED" : "DRAFT"}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'token': Cookies.get('token') || '',
                            },
                        })
                        const data = await res.json()

                        if (data.success) {
                            return true
                        } else {
                            return false
                        }
                    }} />
                </div>
            )}
        </>
    )
}