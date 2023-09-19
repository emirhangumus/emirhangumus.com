import type { OutputData } from "@editorjs/editorjs";

export interface PostInterface {
    id: number;
    title: string;
    image_id: number;
    content: OutputData;
    tag_ids: number[];
    status: "DRAFT" | "PUBLISHED";
    created_at: string;
    updated_at: string;
    slug: string;
    image: {
        id: number;
        user_id: number;
        image_url: string;
        image_blurhash: string;
        created_at: string;
        updated_at: string;
    };
    tags?: {
        id: number;
        name: string;
        slug: string;
        created_at: string;
        updated_at: string;
    }[];
}

export interface PostInterfaceWithPagination {
    posts: PostInterface[];
    limit: number;
    page: number;
    total: number;
}