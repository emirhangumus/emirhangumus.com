import { validateUser } from '@/lib/functions/api/validateUser'
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT':
            await PUT(req, res)
            break
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { slug } = req.query

        const user = await validateUser(req, res)

        if (!user.isLogged) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
            return;
        }

        const schema = z.object({
            blog_id: z.string(),
            status: z.enum(["DRAFT", "PUBLISHED"]),
        })

        const { blog_id, status } = schema.parse(req.query);

        const data = await prisma.posts.update({
            where: {
                id: parseInt(blog_id),
            },
            data: {
                status: status,
            },
        })

        res.status(200).json({
            success: true,
            message: "Post updated",
            data: data,
        })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}