import BlogEditor from "@/components/blog/BlogEditor";
import Container from "@/components/shared/Container";
import TitleWithBackButton from "@/components/shared/TitleWithBackButton";

export default function New() {
    return (
        <>
            <Container>
                <TitleWithBackButton backUrl="/dashboard/blog" text="Yeni Blog Ekle" />
                <BlogEditor />
            </Container>
        </>
    );
}