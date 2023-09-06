import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './Tools';
import { useCallback, useRef } from 'react';
import { EditorCoreInterface } from '@/interfaces/EditorCoreInterface';
import { OutputData } from '@editorjs/editorjs';

type Props = {
    initSave: (instance: EditorCoreInterface) => Promise<void> | void;
    content?: OutputData | null;
};

export default function Editor({ initSave, content }: Props) {
    const editorCore_ = useRef<EditorCoreInterface | null>(null);

    const handleInitialize = useCallback((instance: EditorCoreInterface) => {
        editorCore_.current = instance
        initSave(instance);
    }, [])

    const EditorJS = createReactEditorJS();

    return (
        <>
            {content ?
                <EditorJS tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} defaultValue={content} />
                :
                <EditorJS tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} />
            }
        </>
    );
}