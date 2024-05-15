import { Ani } from "@/interfaces/AniInterface"
import imageUrl from "@/lib/functions/imageUrl"
import Image from "next/image"
import ImageWithBlurhash from "../ImageWithBlurhash"

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
            <div className="block relative rounded-lg overflow-hidden">
                <ImageWithBlurhash
                    src={imageUrl(ani.image.image_url)}
                    alt={ani.description}
                    blurhash={ani.image.image_blurhash}
                    height={480}
                    width={480}
                    key={ani.id}
                />
            </div>
            <div className="flex items-center justify-center w-full">
                <p className="md:text-sm text-xs inline bg-cinder-700 text-cinder-200 px-4 py-0.5 rounded-full">
                    {ani.description}
                </p>
            </div>
        </div>
    )
}