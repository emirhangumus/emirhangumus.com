import FrontPageBanner from "@/components/FrontPageBanner";
import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/shared/Container";
import DecoratedBox from "@/components/shared/DecoratedBox";
import Marquee from "@/components/shared/Marquee";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Anasayfa</title>
      </Head>
      <FadeIn>
        <FrontPageBanner />
        <div className="my-8">
          <Marquee gradient={false} rotate={1} className="mb-2 bg-black border-y py-1 [&_span]:mr-2">
            {
              Array.from({ length: 50 }).map((_, i) => (
                <span className="text-xl font-mono">HIRE ME - </span>
              ))
            }
          </Marquee >
          <Marquee gradient={false} rotate={1} direction="right" className="mb-2 bg-black border-y py-1 [&_span]:mr-2">
            {
              Array.from({ length: 50 }).map((_, i) => (
                <span className="text-xl font-mono">HIRE ME - </span>
              ))
            }
          </Marquee>
        </div >
        <Container>
          <DecoratedBox>

          </DecoratedBox>
        </Container>
      </FadeIn>
    </>
  )
}
