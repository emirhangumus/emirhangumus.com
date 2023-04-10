import Link from "next/link";
import Container from "./shared/Container";
import DecoratedBox from "./shared/DecoratedBox";

export default function FrontPageBanner() {
    return (
        <>
            <Container>
                <DecoratedBox className="flex flex-col gap-6 py-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">
                            Hoşgeldin Macera Sever!
                        </h2>
                        <p className="text-cinder-400 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quod adipisci sunt odio molestias laudantium ipsa voluptatibus blanditiis nisi fugiat!
                        </p>
                    </div>
                    <div className="flex gap-4 text-sm">
                        <Link href="https://github.com/emirhangumus/" className="text-cinder-400 hover:text-cinder-200 transition-colors" target="_blank">
                            GitHub
                        </Link>
                        <Link href="https://www.instagram.com/emirhangms_/" className="text-cinder-400 hover:text-cinder-200 transition-colors" target="_blank">
                            Instagram
                        </Link>
                        <Link href="https://www.linkedin.com/in/emirhangumus/" className="text-cinder-400 hover:text-cinder-200 transition-colors" target="_blank">
                            LinkedIn
                        </Link>
                    </div>
                </DecoratedBox>
            </Container>
        </>
    )
}