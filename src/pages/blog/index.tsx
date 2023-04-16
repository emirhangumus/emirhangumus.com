import BlogContent from "@/components/blog/BlogContent";
import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";

export default function Blog() {
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
                        <BlogContent />
                    </div>
                </div>
            </Container>
        </>
    )
}