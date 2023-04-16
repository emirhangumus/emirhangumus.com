import type { Block, RenderFn } from "editorjs-blocks-react-renderer"

interface CodeBlockData {
    code: string;
    language: string;
    theme: string;
}

export const CodeBlockRenderer: RenderFn<CodeBlockData> = ({ data, className }) => {
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: data.code }} className={`bg-cinder-900 p-2 rounded${className}`} />
        </>
    )
}