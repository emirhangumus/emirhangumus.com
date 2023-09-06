export interface Ani {
    id: number;
    user_id: number;
    description: string;
    image: {
        image_url: string;
        image_blurhash: string;
    }
    created_at: Date;
    updated_at: Date;
}