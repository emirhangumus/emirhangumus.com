import type { OutputData } from "@editorjs/editorjs";

export interface EditorCoreInterface {
    destroy(): void;
    clear(): void;
    save(): Promise<OutputData>;
    render(data: OutputData): Promise<void>;
}