import { PostInterface } from "@/interfaces/PostInterface"
import { useEffect, useState } from "react"
import BlogCard from "./BlogCard"
import Divider from "../shared/Divider"
import LoadingSpinner from "../shared/LoadingSpinner"

export default function BlogContent() {

    const [posts, setPosts] = useState<PostInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/blog')
            const data = await res.json()
            setPosts(data.data)
            setLoading(false)
        }
        fetchPosts()
    }, [])

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col pb-4">
                    {posts.map((post, index) => (
                        <div key={post.id}>
                            <BlogCard post={post} />
                            {index !== posts.length - 1 && <Divider />}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}