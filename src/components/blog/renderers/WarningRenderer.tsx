import type { Block, RenderFn } from "editorjs-blocks-react-renderer"
import Link from "next/link"
import Image from "next/image"

type WarningData = {
    title: string,
    message: string
}

export const WarningRenderer: RenderFn<WarningData> = ({ data, className = "" }) => {
    return (
        <>
            <div className={`border-2 bg-red-900 bg-opacity-40 border-red-900 p-2 rounded-lg mb-4 gap-2 relative flex flex-col ${className}`}>
                <span className="text-xl font-bold relative z-10 flex items-center gap-2">
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <rect x='5' y='5' width='14' height='14' rx='4' stroke='white' stroke-width='2' />
                        <line x1='12' y1='9' x2='12' y2='12' stroke='white' stroke-width='2' stroke-linecap='round' />
                        <path d='M12 15.02V15.01' stroke='white' stroke-width='2' stroke-linecap='round' />
                    </svg>
                    <span>
                        {data.title}
                    </span>
                </span>
                <span className="text-sm text-white relative z-10">{data.message}</span>
            </div>
        </>
    )
}
