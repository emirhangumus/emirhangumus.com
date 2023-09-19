import type { Block, RenderFn } from "editorjs-blocks-react-renderer"

interface CodeBlockData {
    code: string;
    language: string;
    theme: string;
}

export const CodeBlockRenderer: RenderFn<CodeBlockData> = ({ data, className = "" }) => {
    return (
        <>
            <pre dangerouslySetInnerHTML={{ __html: data.code }} className={`bg-cinder-900 p-2 rounded mb-4 ${className}`} ></pre>
        </>
    )
}