import { validateUser } from '@/lib/functions/api/validateUser'
import { url_slug } from '@/lib/functions/url_slug'
import { parseForm } from '@/lib/parse-form'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            await GET(req, res)
            break
        case 'POST':
            await POST(req, res)
            break
        case 'DELETE':
            await DELETE(req, res)
            break
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const isOkay = await validateUser(req, res);

        if (!isOkay.isLogged) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const posts = await prisma.posts.findMany({
            include: {
                image: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });

        if (!posts) {
            return res.status(500).json({ success: false, message: "Something went wrong" })
        }

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: posts,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let schema;

        if (req.query.slug) {
            schema = z.object({
                title: z.string().min(1),
                content: z.string(),
                tags: z.string().min(1),
                media: z.string().optional(),
            })
        }
        else {
            schema = z.object({
                title: z.string().min(1),
                content: z.string(),
                tags: z.string().min(1),
                media: z.string().min(1),
            })
        }

        const isOkay = await validateUser(req, res);

        if (!isOkay.isLogged) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const { fields, files } = await parseForm(req, {
            get: "id"
        });

        const { title, content, tags, media } = fields;

        schema.parse({ title, content, tags, media });

        let tagsArray: string[] = [];

        if (typeof tags === "string") {
            tagsArray = JSON.parse(tags);
        } else {
            tagsArray = tags;
        }

        // check the tags, if it same with the existing tags, then just use the existing tag id instead of creating a new one
        let tagsIdArray: number[] = await Promise.all(tagsArray.map(async (tag: string) => {
            const tagData = await prisma.tags.findUnique({
                where: {
                    slug: url_slug(tag.trim().toLowerCase(), { lower: true }),
                },
            });

            if (tagData) {
                return tagData.id;
            }

            const newTag = await prisma.tags.create({
                data: {
                    name: tag.trim().toLowerCase(),
                    slug: url_slug(tag.trim().toLowerCase(), { lower: true }),
                },
            });

            return newTag.id;
        }));

        let post;

        if (req.query.slug) {
            post = await prisma.posts.update({
                where: {
                    slug: req.query.slug as string,
                },
                data: {
                    title: Array.isArray(title) ? title[0] : title,
                    content: JSON.parse(Array.isArray(content) ? content[0] : content),
                    tag_ids: tagsIdArray,
                    slug: url_slug(Array.isArray(title) ? title[0] : title, { lower: true }),
                    image_id: parseInt(Array.isArray(media) ? media[0] : media),
                },
            });
        } else {
            post = await prisma.posts.create({
                data: {
                    title: Array.isArray(title) ? title[0] : title,
                    content: JSON.parse(Array.isArray(content) ? content[0] : content),
                    tag_ids: tagsIdArray,
                    slug: url_slug(Array.isArray(title) ? title[0] : title, { lower: true }),
                    image_id: parseInt(Array.isArray(media) ? media[0] : media),
                },
            });
        }

        if (!post) {
            return res.status(500).json({ success: false, message: "Something went wrong" })
        }

        res.status(200).json({
            success: true,
            message: "Post created successfully",
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const isOkay = await validateUser(req, res);

        if (!isOkay.isLogged) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const { blog_id } = req.query;

        if (!blog_id) {
            return res.status(400).json({ success: false, message: "Bad request" })
        }

        const post = await prisma.posts.delete({
            where: {
                id: parseInt(blog_id as string),
            },
        });

        if (!post) {
            return res.status(500).json({ success: false, message: "Something went wrong" })
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
