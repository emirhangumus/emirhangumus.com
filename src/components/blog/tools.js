// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import CodeBox from "@bomdi/codebox";
import Cookies from "js-cookie";

export const EDITOR_JS_TOOLS = {
    paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    linkTool: {
        class: LinkTool,
        config: {
            endpoint: "/api/blog/fetchUrl",
            headers: {
                token: Cookies.get("token") || "",
            },
        },
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByFile: async (file) => {
                    const formData = new FormData();
                    formData.append("media", file);
                    return fetch("/api/blog/uploadFile", {
                        method: "POST",
                        headers: {
                            token: Cookies.get("token") || "",
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            if (result.success) {
                                return {
                                    success: 1,
                                    file: {
                                        url: result.data.url,
                                    },
                                };
                            }
                            return {
                                success: 0,
                            };
                        })
                        .catch((e) => {
                            console.log("e", e);
                            return {
                                success: 0,
                            };
                        });
                },
            },
        },
    },
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    codeBox: {
        class: CodeBox,
        config: {
            themeURL:
                "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
            themeName: "atom-one-dark", // Optional
            useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
        },
    },
};
