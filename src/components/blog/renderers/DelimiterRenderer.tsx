import type { RenderFn } from "editorjs-blocks-react-renderer"

export const DelimiterRenderer: RenderFn = ({ data, className = "" }) => {
    return (
        <>
            <hr className={`border border-cinder-700 mb-4 ${className}`} />
        </>
    )
}