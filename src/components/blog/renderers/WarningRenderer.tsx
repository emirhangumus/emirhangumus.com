import type { Block, RenderFn } from "editorjs-blocks-react-renderer"
import Link from "next/link"
import Image from "next/image"
import Danger from "@/components/svg/Danger"

type WarningData = {
    title: string,
    message: string
}

export const WarningRenderer: RenderFn<WarningData> = ({ data, className = "" }) => {
    return (
        <>
            <div className={`border-2 bg-red-900 bg-opacity-40 border-red-900 p-2 rounded-lg mb-4 gap-2 relative flex flex-col ${className}`}>
                <span className="text-xl font-bold relative z-10 flex items-center gap-2">
                    <Danger color="#fff" />
                    <span dangerouslySetInnerHTML={{ __html: data.title }}></span>
                </span>
                <span className="text-sm text-white relative z-10" dangerouslySetInnerHTML={{ __html: data.message }}></span>
            </div>
        </>
    )
}
