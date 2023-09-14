import ContactForm from "@/components/contact/ContactForm";
import SocialMedias from "@/components/contact/SocialMedias";
import Container from "@/components/shared/Container";
import DecoratedBox from "@/components/shared/DecoratedBox";
import Text from "@/components/shared/Text";
import Head from "next/head"

export default function Iletisim() {
    return (
        <>
            <Head>
                <title>İletişim | Emirhan Gümüş</title>
            </Head>
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