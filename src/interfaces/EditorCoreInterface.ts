import type { OutputData } from "@editorjs/editorjs";

export interface EditorCoreInterface {
    destroy(): Promise<void>;
    clear(): Promise<void>;
    save(): Promise<OutputData>;
    render(data: OutputData): Promise<void>;
    get dangerouslyLowLevelInstance(): any | null;
}