import NImage from "next/image";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

interface ImageWithBlurhashProps {
    src: string;
    alt: string;
    blurhash: string;
    width: number;
    height: number;
}

export default function ImageWithBlurhash({ src, alt, blurhash, width, height }: ImageWithBlurhashProps) {

    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);
    }, [src]);

    return (
        !loaded ? (
            <div className="relative w-full h-full aspect-square">
                <Blurhash
                    hash={blurhash}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    className="absolute top-0 left-0 !w-full !h-full"
                />
            </div>
        ) : (
            <NImage src={src} alt={alt} width={width} height={height} className="object-cover" />
        )
    )
}