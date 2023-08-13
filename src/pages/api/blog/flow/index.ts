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
        const posts = await prisma.posts.findMany({
            include: {
                image: true,
            },
            orderBy: {
                created_at: 'desc',
            },
            where: {
                status: 'PUBLISHED'
            }
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
