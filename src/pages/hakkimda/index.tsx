import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/shared/Container";
import DecoratedBox from "@/components/shared/DecoratedBox";
import Text from "@/components/shared/Text";
import Arrow from "@/components/svg/Arrow";
import Head from "next/head";
import Link from "next/link";

const about_texts = [
    `
        Merhaba, ben <strong>Emirhan Gümüş</strong>. Samsun'da yaşıyorum. 20 yaşındayım ve Anadolu Üniversitesi Web Tasarım ve Kodlama okuyorum.
    `,
    `
        Ben bir web geliştiricisiyim ve <strong>HTML</strong>, <strong>CSS</strong>, <strong>Javascript</strong>, <strong>Typescript</strong>, <strong>Flutter</strong> ve <strong>SQL</strong> gibi birçok teknolojiyi biliyorum. Aynı zamanda, <strong>Express JS</strong>, <strong>PrismaJS</strong> ve <strong>KnexJS</strong> gibi backend teknolojilerini de kullanarak API'ler oluşturuyorum. Ayrıca, <strong>SASS</strong> ve <strong>Tailwind</strong> gibi CSS preprocessorlerini kullanabiliyorum ve <strong>Photoshop</strong> ve <strong>Figma</strong> gibi tasarım araçlarını kullanarak görsel öğeleri tasarlayabilirim.
    `,
    `
        Benim uzmanlık alanım web geliştirme ve ben birçok farklı web teknolojisinde deneyim sahibiyim. <strong>React</strong>, <strong>NextJS</strong>, <strong>Svelte</strong> ve <strong>Svelte Kit</strong> gibi modern JavaScript kütüphanelerinde uzmanlaşmış durumdayım ve bu teknolojilerle birçok başarılı proje geliştirdim.
    `,
    `
        Portfolyomda yer alan örneklerim, benim beceri setimi sergiliyor ve hangi teknolojileri kullandığımı gösteriyor. Bu örnekler, sizlere benimle birlikte çalışmanın nasıl bir deneyim olacağına dair fikir verecektir.
    `,
    `
        Özetle, ben birçok farklı teknolojiyi bilen, web geliştirme konusunda uzmanlaşmış bir geliştiriciyim ve benimle birlikte çalışmak isteyen herkes için birçok örnek sunabilirim.
    `
];

export default function Hakkimda() {
    return (
        <>
            <Head>
                <title>Hakkımda | Emirhan Gümüş</title>
            </Head>
            <Container>
                <div className="flex flex-col gap-4 pb-12">
                    <Text level="h1">Hakkımda</Text>
                    {about_texts.map((text, index) => (
                        <FadeIn delay={(index + 1) * 300} key={index}>
                            <DecoratedBox className="flex flex-col gap-4 py-4">
                                <p className="text-cinder-400 lg:text-base text-sm" dangerouslySetInnerHTML={{ __html: text }} />
                            </DecoratedBox>
                        </FadeIn>
                    ))}
                    <div>
                        <FadeIn delay={about_texts.length * 300 + 300}>
                            <div className="relative flex items-center gap-2">
                                <Arrow className="fill-white" />
                                <Link href="/iletisim" className="text-cinder-950 bg-cinder-50 inline-block px-8 py-1 rounded-full lg:text-base text-sm font-mono">
                                    İletişim
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </Container>
        </>
    )
}