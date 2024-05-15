import Link from "next/link";
import Container from "../shared/Container";
import DecoratedBox from "../shared/DecoratedBox";
import Web from "../svg/Web";
import Phone from "../svg/Phone";
import Server from "../svg/Server";
import BasicCard from "../shared/cards/BasicCard";

const items = [
    {
        icon: <Web className="fill-cinder-200" />,
        title: "Web Geliştirme",
        description: "Modern web teknolojileri ile web uygulamaları geliştiriyorum.",
        link: "/iletisim",
        linkText: "İletişime Geç"
    },
    {
        icon: <Phone className="fill-cinder-200" height="24" width="24" />,
        title: "Mobile Geliştirme",
        description: "React Native ve Flutter ile cross-platform mobil uygulamalar geliştiriyorum.",
        link: "/iletisim",
        linkText: "İletişime Geç"
    },
    {
        icon: <Server className="fill-cinder-200" height="22" width="22" />,
        title: "Backend Geliştirme",
        description: "Node.js ile backend uygulamaları/API geliştiriyorum.",
        link: "/iletisim",
        linkText: "İletişime Geç"
    }
];

export default function FrontPageCards() {
    return (
        <>
            <Container className="lg:my-16 my-8">
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
                    {items.map((item, i) => (
                        <BasicCard
                            key={i}
                            item={{
                                icon: item.icon,
                                title: item.title,
                                description: item.description,
                                link: item.link,
                                linkText: item.linkText
                            }}
                        />
                    ))}
                </div>
            </Container>
        </>
    )
}