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
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const { tagSlug } = req.query

    const tag_slug = Array.isArray(tagSlug) ? tagSlug[0] : tagSlug

    if (!tag_slug) {
        res.status(400).json({
            success: false,
            message: 'Missing tag slug',
        })
        return
    }

    const tag = await prisma.tags.findUnique({
        where: {
            slug: tag_slug,
        },
    })

    if (!tag) {
        res.status(400).json({
            success: false,
            message: 'Tag not found',
        })
        return
    }

    const posts = await prisma.posts.findMany({
        where: {
            tag_ids: {
                array_contains: tag.id
            },
            status: 'PUBLISHED',
        },
        include: {
            image: true,
        },
        orderBy: {
            created_at: 'desc',
        },
    })

    res.status(200).json({
        success: true,
        data: {
            posts: posts,
            tag: tag,
        }
    })
}
