import Link from "next/link";
import Container from "./shared/Container";
import DecoratedBox from "./shared/DecoratedBox";
import { useEffect, useRef, useState } from "react";

export default function FrontPageBanner() {

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghıjklmnopqrstuvwxyz";

    const correctName = "Emirhan Gümüş";

    let nameRef = useRef<HTMLSpanElement>(null);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        let i = 0;
        let max = correctName.length;
        let r = ""
        let currentStepString = "";
        let interval = setInterval(() => {
            if (nameRef.current?.innerText === correctName) {
                clearInterval(interval);
                return;
            }

            // r is the random string long as max
            r = Array.from({ length: max }).map((_, i) => letters[Math.floor(Math.random() * letters.length)]).join("");

            // overwrite corrent name to r with index
            currentStepString = correctName.slice(0, i) + r.slice(i);

            // set the name to currentStepString
            setName(currentStepString);

            i++;

            // if the name is equal to the correct name, clear the interval
            if (nameRef.current?.innerText === correctName) {
                clearInterval(interval);
            }

        }, 150);
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <Container>
                <DecoratedBox className="flex flex-col gap-6 py-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold font-mono">
                            Hoşgeldin! Ben <span ref={nameRef}>{name}</span>
                        </h2>
                        <p className="text-cinder-400 text-sm">
                            Yazılım geliştiricisiyim. Web ve mobil uygulamalar geliştiriyorum.
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
            </Container >
        </>
    )
}