import ContactForm from "@/components/contact/ContactForm";
import SocialMedias from "@/components/contact/SocialMedias";
import Container from "@/components/shared/Container";
import DecoratedBox from "@/components/shared/DecoratedBox";
import Text from "@/components/shared/Text";

export default function Iletisim() {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4 pb-4">
                    <Text level="h1">İletişim</Text>
                </div>
                <DecoratedBox className="py-8 mb-4">
                    <ContactForm />
                </DecoratedBox>
                <SocialMedias />
            </Container>
        </>
    )
};