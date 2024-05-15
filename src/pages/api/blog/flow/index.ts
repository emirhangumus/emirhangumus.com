import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            await GET(req, res)
            break
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { limit, skip } = req.query;

        const posts = await prisma.posts.findMany({
            select: {
                image: true,
                id: true,
                created_at: true,
                slug: true,
                status: true,
                tag_ids: true,
                updated_at: true,
                title: true,
                image_id: true,
            },
            orderBy: {
                created_at: 'desc',
            },
            where: {
                status: 'PUBLISHED'
            },
            take: Number(limit) || 10,
            skip: Number(skip) || 0,
        });

        const total_posts = await prisma.posts.count({
            where: {
                status: 'PUBLISHED'
            }
        });

        let currentPage = Number(limit) / Number(skip);

        if (currentPage === Infinity) {
            currentPage = 1;
        }

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: {
                posts,
                page: currentPage,
                limit: Number(limit) || 10,
                total: total_posts,
            },
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}
