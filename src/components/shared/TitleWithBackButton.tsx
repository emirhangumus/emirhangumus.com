import Link from "next/link";
import Text from "../shared/Text";
import Arrow from "../svg/Arrow";

type Props = {
    backUrl?: string;
    text?: string;
};

export default function TitleWithBackButton({ backUrl = "/dashboard", text = "" }: Props) {
    return (
        <div className="flex items-center gap-2">
            <Link href={backUrl}>
                <Arrow />
            </Link>
            <Text level="h1">{text}</Text>
        </div>
    )
}