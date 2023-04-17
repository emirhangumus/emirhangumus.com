import type { Block, RenderFn } from "editorjs-blocks-react-renderer"

type ChecklistDataItem = {
    text: string,
    checked: boolean
}

type ChecklistData = {
    items: ChecklistDataItem[]
}

export const ChecklistRenderer: RenderFn<ChecklistData> = ({ data, className = "" }) => {
    return (
        <>
            <ul className={`list-disc list-inside ${className}`}>
                {data.items.map((item, index) => (
                    <li key={index} className={item.checked ? "line-through" : ""}>
                        {item.text}
                    </li>
                ))}
            </ul>
        </>
    )
}