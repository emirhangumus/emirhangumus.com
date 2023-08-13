import { PostInterface } from "@/interfaces/PostInterface"
import BlogCard from "./BlogCard"
import Divider from "../shared/Divider"
import FadeIn from "../animations/FadeIn"
import Text from "../shared/Text"

export default function BlogContent({ posts }: { posts: PostInterface[] }) {
    return (
        <>
            {posts.length > 0 ? (
                <div className="flex flex-col pb-4">
                    {posts.map((post, index) => (
                        <FadeIn key={post.id}>
                            <BlogCard post={post} />
                            {index !== posts.length - 1 && <Divider className="border-cinder-800" />}
                        </FadeIn>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <Text level="h2" className="text-center">
                        Henüz hiçbir şey yazmamışım.
                    </Text>
                    <Text className="mt-2 text-center">
                        Ama yakında bir şeyler yazacağım.
                    </Text>
                </div>
            )}
        </>
    )
}