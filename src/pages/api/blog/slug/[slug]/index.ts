import prisma from '@/lib/prisma'
import { posts, tags } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            await GET(req, res)
            break;
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { slug } = req.query

        interface PostWithTags extends posts {
            tags: tags[]
        }

        const data = await prisma.posts.findFirst({
            where: {
                slug: slug as string,
                status: "PUBLISHED",
            },
            include: {
                image: true,
            }
        })

        if (!data) {
            res.status(404).json({
                success: false,
                message: "Post not found",
            })
            return;
        }

        if (!data.tag_ids) {
            data.tag_ids = [];
        }

        // fetch the tags
        const tagIds = data.tag_ids as number[];

        const tags = await Promise.all(tagIds.map(async (id: number) => {
            const tag = await prisma.tags.findUnique({
                where: {
                    id: id,
                }
            })

            if (!tag) {
                return null;
            }
            return tag;
        }));

        const postWithTags: PostWithTags = { ...data, tags: tags as tags[] };

        res.status(200).json({
            success: true,
            data: {
                ...postWithTags,
                // @ts-ignore
                content: JSON.parse(postWithTags.content),
            },
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
