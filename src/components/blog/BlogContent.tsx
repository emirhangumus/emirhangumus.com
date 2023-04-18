import { PostInterface } from "@/interfaces/PostInterface"
import BlogCard from "./BlogCard"
import Divider from "../shared/Divider"
import FadeIn from "../animations/FadeIn"

export default function BlogContent({ posts }: { posts: PostInterface[] }) {
    return (
        <>
            <div className="flex flex-col pb-4">
                {posts.map((post, index) => (
                    <FadeIn key={post.id}>
                        <BlogCard post={post} />
                        {index !== posts.length - 1 && <Divider className="border-cinder-800" />}
                    </FadeIn>
                ))}
            </div>
        </>
    )
}