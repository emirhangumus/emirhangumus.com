import Link from "next/link";
import DecoratedBox from "../DecoratedBox";

type TData = {
    icon: JSX.Element;
    title: string;
    description: string;
    link: string;
    linkText: string;
}

export default function Card({ item }: { item: TData }) {
    return (
        <>
            <DecoratedBox className="px-4 py-8 flex gap-4 flex-col">
                <div className="flex gap-2 items-center">
                    {item.icon}
                    <h1>{item.title}</h1>
                </div>
                <p className="text-cinder-300 text-sm">{item.description}</p>
                <div>
                    <Link href={item.link} className="bg-white text-black rounded-full px-4 py-0.5 inline text-sm font-mono">
                        {item.linkText}
                    </Link>
                </div>
            </DecoratedBox>
        </>
    );
}