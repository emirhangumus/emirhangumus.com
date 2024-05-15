import Blocks from "editorjs-blocks-react-renderer";
import type { DataProp } from "editorjs-blocks-react-renderer";
import { CodeBlockRenderer } from "./renderers/CodeBlockRenderer";
import { ChecklistRenderer } from "./renderers/ChecklistRenderer";
import { LinkRenderer } from "./renderers/LinkRenderer";
import { WarningRenderer } from "./renderers/WarningRenderer";
import { DelimiterRenderer } from "./renderers/DelimiterRenderer";
import { TableRenderer } from "./renderers/TableRenderer";

export function RenderContent({ data }: { data: DataProp }) {
    return (
        <Blocks data={data as DataProp} config={defaultConfigs} renderers={{
            codeBox: CodeBlockRenderer,
            checklist: ChecklistRenderer,
            linkTool: LinkRenderer,
            warning: WarningRenderer,
            delimiter: DelimiterRenderer,
            table: TableRenderer,
        }} />
    );
}

const defaultConfigs = {
    code: {
        className: ""
    },
    delimiter: {
        className: ""
    },
    embed: {
        className: "",
        rel: "noreferer nofollower external", // Generates an <a> if not able to receive an "embed" property
        sandbox: undefined
    },
    header: {
        className: ""
    },
    image: {
        className: "flex flex-col",
        actionsClassNames: {
            stretched: "image-block--stretched",
            withBorder: "image-block--with-border",
            withBackground: "image-block--with-background",
        }
    },
    list: {
        className: ""
    },
    paragraph: {
        className: ""
    },
    quote: {
        className: "",
        actionsClassNames: {
            alignment: "text-align-center", // This is a substitution placeholder: left or center.
        }
    },
    table: {
        className: ""
    }
}