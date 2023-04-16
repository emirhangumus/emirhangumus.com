import Container from "@/components/shared/Container";
import DecoratedBox from "@/components/shared/DecoratedBox";
import Text from "@/components/shared/Text";

export default function Hakkimda() {
    return (
        <>
            <Container>
                <div className="flex flex-col gap-4 pb-4">
                    <Text level="h1">Hakkımda</Text>
                    <DecoratedBox className="flex flex-col gap-4 py-4">
                        <p className="text-cinder-400 lg:text-base text-sm">
                            Merhaba, ben <strong>Emirhan Gümüş</strong>. Samsun'da yaşıyorum. 20 yaşındayım ve Anadolu Üniversitesi Web Tasarım ve Kodlama okuyorum.
                        </p>
                    </DecoratedBox>
                    <DecoratedBox className="flex flex-col gap-4 py-4">
                        <p className="text-cinder-400 lg:text-base text-sm">
                            Ben bir web geliştiricisiyim ve <strong>HTML</strong>, <strong>CSS</strong>, <strong>Javascript</strong>, <strong>Typescript</strong>, <strong>Flutter</strong> ve <strong>SQL</strong> gibi birçok teknolojiyi biliyorum. Aynı zamanda, <strong>Express JS</strong>, <strong>PrismaJS</strong> ve <strong>KnexJS</strong> gibi backend teknolojilerini de kullanarak API'ler oluşturuyorum. Ayrıca, <strong>SASS</strong> ve <strong>Tailwind</strong> gibi CSS preprocessorlerini kullanabiliyorum ve <strong>Photoshop</strong> ve <strong>Figma</strong> gibi tasarım araçlarını kullanarak görsel öğeleri tasarlayabilirim.
                        </p>
                    </DecoratedBox>
                    <DecoratedBox className="flex flex-col gap-4 py-4">
                        <p className="text-cinder-400 lg:text-base text-sm">
                            Benim uzmanlık alanım web geliştirme ve ben birçok farklı web teknolojisinde deneyim sahibiyim. <strong>React</strong>, <strong>NextJS</strong>, <strong>Svelte</strong> ve <strong>Svelte Kit</strong> gibi modern JavaScript kütüphanelerinde uzmanlaşmış durumdayım ve bu teknolojilerle birçok başarılı proje geliştirdim.
                        </p>
                    </DecoratedBox>
                    <DecoratedBox className="flex flex-col gap-4 py-4">
                        <p className="text-cinder-400 lg:text-base text-sm">
                            Portfolyomda yer alan örneklerim, benim beceri setimi sergiliyor ve hangi teknolojileri kullandığımı gösteriyor. Bu örnekler, sizlere benimle birlikte çalışmanın nasıl bir deneyim olacağına dair fikir verecektir.
                        </p>
                    </DecoratedBox>
                    <DecoratedBox className="flex flex-col gap-4 py-4">
                        <p className="text-cinder-400 lg:text-base text-sm">
                            Özetle, ben birçok farklı teknolojiyi bilen, web geliştirme konusunda uzmanlaşmış bir geliştiriciyim ve benimle birlikte çalışmak isteyen herkes için birçok örnek sunabilirim.
                        </p>
                    </DecoratedBox>
                </div>
            </Container>
        </>
    )
}