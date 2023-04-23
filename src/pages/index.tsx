import FrontPageBanner from "@/components/frontpage/FrontPageBanner";
import FadeIn from "@/components/animations/FadeIn";
import Head from "next/head";
import FrontPageMarquee from "@/components/frontpage/FrontPageMarquee";
import FrontPageCards from "@/components/frontpage/FrontPageCards";
import FrontPageTechs from "@/components/frontpage/FrontPageTechs";
import ContactForm from "@/components/contanct/ContactForm";
import DecoratedBox from "@/components/shared/DecoratedBox";
import Container from "@/components/shared/Container";

export default function Home() {
  return (
    <>
      <Head>
        <title>Anasayfa</title>
      </Head>
      <FadeIn>
        <FrontPageBanner />
        <FrontPageMarquee />
        <FrontPageCards />
        <FrontPageTechs />
        <div className="w-full border-y border-cinder-800 bg-cinder-950 bg-opacity-70 px-4 sm:px-6 lg:px-8 relative py-8">
          <h1 className="font-bold lg:text-3xl text-xl text-center mb-4">İletişim</h1>
          <ContactForm />
        </div>
      </FadeIn >
    </>
  )
}
