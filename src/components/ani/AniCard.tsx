import { Ani } from "@/interfaces/AniInterface"
import Image from "next/image"

type Props = {
    ani: Ani,
}

export default function AniCard({ ani }: Props) {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-center w-full">
                <p className="md:text-sm text-xs whitespace-nowrap inline bg-blue-700 px-4 py-0.5 rounded-full">
                    {new Date(ani.created_at).toLocaleDateString('tr-TR', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>
            <Image
                src={ani.image}
                alt={ani.description}
                height={480}
                width={480}
                className="rounded-lg object-contain"
            />
            <div className="flex items-center justify-center w-full">
                <p className="md:text-sm text-xs inline bg-cinder-700 text-cinder-200 px-4 py-0.5 rounded-full">
                    {ani.description}
                </p>
            </div>
        </div>
    )
}