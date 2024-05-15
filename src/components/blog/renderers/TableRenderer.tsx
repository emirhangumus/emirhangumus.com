import type { RenderFn } from "editorjs-blocks-react-renderer"
import type { TableBlockData } from "editorjs-blocks-react-renderer/dist/renderers/table"
import Table from "editorjs-blocks-react-renderer/dist/renderers/table"


export const TableRenderer: RenderFn<TableBlockData> = ({ data, className = "" }) => {
    return (
        <>
            <div className={`table-responsive ${className}`}>
                <Table data={data as TableBlockData} className={className} ></Table>
            </div>
        </>
    )
}