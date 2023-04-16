import Container from "./shared/Container";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function Header() {
    // get current path
    const [path, setPath] = useState<string>("/");
    const router = useRouter();

    useEffect(() => {
        setPath(window.location.pathname);
    }, []);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            // do something when the route changes
            setPath(url);
        }

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        }
    }, [router.events]);

    const items = [
        {
            id: 'blog',
            title: "Blog",
            href: "/blog"
        },
        {
            id: 'hakkimda',
            title: "Hakkımda",
            href: "/hakkimda"
        },
        {
            id: 'iletisim',
            title: "İletişim",
            href: "/iletisim"
        },
        {
            id: 'anilarim',
            title: "Anılarım",
            href: "/anilarim"
        }
    ];

    return (
        <header className="border-b border-cinder-900 mb-4">
            <Container>
                <div className="flex justify-between py-4 items-center">
                    <Link href="/" className="text-2xl font-bold group">
                        <div className="flex gap-4 items-center">
                            <div className="relative aspect-square lg:w-24 lg:h-24 w-16 h-16 rounded-full overflow-hidden outline outline-2 outline-cinder-500">
                                <Image src="/me.jpg" alt="Logo" fill={true} />
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <h1 className="lg:text-2xl text-base font-bold">Emirhan Gümüş</h1>
                                    <p className="lg:text-2xl text-base text-zinc-500 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-pink-700 group-hover:to-blue-700">Full-Stack Developer</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="lg:block hidden">
                        <ul className="flex gap-2">
                            {items.map(item => (
                                <li key={item.id}>
                                    <Link href={item.href} className={`${path === item.href ? 'bg-cinder-800 text-white' : 'hover:text-cinder-100'} text-cinder-200 px-6 py-0.5 rounded-full block`}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </header >
    )
}