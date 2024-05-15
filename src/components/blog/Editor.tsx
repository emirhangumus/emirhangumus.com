import { EDITOR_JS_TOOLS } from './Tools';
import { useEffect, useRef, useState } from 'react';
import { EditorCoreInterface } from '@/interfaces/EditorCoreInterface';
import EditorJS, { OutputData } from '@editorjs/editorjs';

type Props = {
    initSave: (instance: EditorCoreInterface) => Promise<void> | void;
    content?: OutputData | null;
};

export default function Editor({ initSave, content }: Props) {
    const editorCore_ = useRef<EditorCoreInterface | null>(null);
    const [editorLoading, setEditorLoading] = useState<boolean>(true);

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

        setEditorLoading(false);
        return () => {
            if (!editor || !(editor.destroy instanceof Function)) return;
            editor.destroy();
        };
    }, []);

    return (
        <>
            {editorLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cinder-300"></div>
                </div>
            )}
            <div id="editorjs" />
        </>
    );
}