import DecoratedBox from "../shared/DecoratedBox";
import Link from "next/link";
import { socialMedia } from "@/constants/socialMedia";

type Props = {
    align?: "center" | "left" | "right";
    removeBorder?: boolean;
}

export default function SocialMedias({ align = "center", removeBorder = false }: Props) {
    return (
        removeBorder
            ?
            <Content align={align} />
            :
            <DecoratedBox>
                <Content align={align} />
            </DecoratedBox >

    )
}

function Content({ align = "center" }: Props) {
    return (
        <div className={`flex flex-col gap-2 ${align === "center" ? "lg:items-center" : align === "left" ? "lg:items-start" : "lg:items-end"} items-center`}>
            <div className="flex gap-2 py-4">
                {socialMedia.map((media, index) => (
                    <Link href={media.url} key={index} target="_blank" rel="noopener noreferrer" aria-label={media.name + ' icon'}>
                        {media.icon}
                    </Link>
                ))}
            </div>
        </div>
    )
}