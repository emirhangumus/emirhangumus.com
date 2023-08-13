import NewAniForm from "@/components/forms/NewAniForm";
import Container from "@/components/shared/Container";
import Text from "@/components/shared/Text";
import TitleWithBackButton from "@/components/shared/TitleWithBackButton";

export default function New() {
    return (
        <>
            <Container>
                <TitleWithBackButton backUrl="/dashboard/anilar" text="Yeni Anı Ekle" />
                <NewAniForm />
            </Container>
        </>
    );
}