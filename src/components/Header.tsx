import Container from "./shared/Container";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header>
            <Container>
                <div className="flex justify-between py-8 items-center">
                    <Link href="/" className="text-2xl font-bold">
                        <div className="flex gap-4 items-center">
                            <div className="relative aspect-square w-24 h-24 rounded-full overflow-hidden outline outline-2 outline-cinder-500">
                                <Image src="/me.jpg" alt="Logo" fill={true} />
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-bold">Emirhan Gümüş</h1>
                                    <p className="text-zinc-500">Full-Stack Developer</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="lg:block hidden">
                        <ul className="flex gap-4">
                            <li>
                                <Link href="/blog" className="text-zinc-200">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/hakkimda" className="text-zinc-200">
                                    Hakkımda
                                </Link>
                            </li>
                            <li>
                                <Link href="/iletisim" className="text-zinc-200">
                                    İletişim
                                </Link>
                            </li>
                            <li>
                                <Link href="/ani" className="text-zinc-200">
                                    Anılar
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </header>
    )
}