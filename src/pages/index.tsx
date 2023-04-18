import FrontPageBanner from "@/components/FrontPageBanner";
import FadeIn from "@/components/animations/FadeIn";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Anasayfa</title>
      </Head>
      <FadeIn>
        <FrontPageBanner />
      </FadeIn>
    </>
  )
}
