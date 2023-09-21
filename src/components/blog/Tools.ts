// @ts-nocheck
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import CodeBox from "@bomdi/codebox";
import Cookies from "js-cookie";
import imageUrl from "@/lib/functions/imageUrl";

export const EDITOR_JS_TOOLS = {
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    embed: Embed,
    table: {
        class: Table,
        inlineToolbar: true,
    },
    list: {
        class: List,
        inlineToolbar: true,
    },
    warning: {
        class: Warning,
        inlineToolbar: true,
    },
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
        class: ImageTool,
        config: {
            uploader: {
                uploadByFile: async (file: File) => {
                    console.log("file", file);

                    const formData = new FormData();
                    formData.append("image", file);
                    return fetch(process.env.NEXT_PUBLIC_IMAGE_PROVIDER_URL + "/upload", {
                        method: "POST",
                        headers: {
                            "authorization": "Bearer " + Cookies.get("imageToken"),
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            if (result.success) {
                                return {
                                    success: 1,
                                    file: {
                                        url: imageUrl(result.data.path.replace(/\\/g, "/")),
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
    header: {
        class: Header,
        inlineToolbar: true,
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
    },
    marker: {
        class: Marker,
        inlineToolbar: true,
    },
    checklist: {
        class: CheckList,
        inlineToolbar: true,
    },
    delimiter: {
        class: Delimiter,
        inlineToolbar: true,
    },
    inlineCode: {
        class: InlineCode,
        inlineToolbar: true,
    },
    codeBox: {
        class: CodeBox,
        config: {
            themeURL: "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
            themeName: "atom-one-dark", // Optional
            useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
        },
    },
};
