import { EDITOR_JS_TOOLS } from './Tools';
import { useEffect, useRef } from 'react';
import { EditorCoreInterface } from '@/interfaces/EditorCoreInterface';
import EditorJS, { OutputData } from '@editorjs/editorjs';

type Props = {
    initSave: (instance: EditorCoreInterface) => Promise<void> | void;
    content?: OutputData | null;
};

export default function Editor({ initSave, content }: Props) {
    const editorCore_ = useRef<EditorCoreInterface | null>(null);

    useEffect(() => {
        const editor = new EditorJS({
            holder: "editorjs",
            data: content ? content : undefined,
            tools: EDITOR_JS_TOOLS,
            placeholder: "Buradan yazmaya başlayın.",
        });

        editor.isReady.then(() => {
            editorCore_.current = {
                destroy: editor.destroy,
                clear: editor.clear,
                save: editor.save,
                render: editor.render,
            };
            initSave(editorCore_.current);
        });

        return () => {
            editor.destroy();
        };
    }, []);

    return (
        <>
            <div id="editorjs" />
        </>
    );
}