// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { validateUser } from '@/lib/functions/api/validateUser'
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
        let anilar = await prisma.anilar.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                image: {
                    select: {
                        image_url: true,
                        image_blurhash: true,
                    },
                },
            }
        });
        res.status(200).json({ success: true, data: anilar })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const isOkay = await validateUser(req, res);

        if (!isOkay.isLogged) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const schema = z.object({
            path: z.string(),
            blurhash: z.string(),
            description: z.string(),
        });

        const { path, blurhash, description } = schema.parse(req.body)

        if (!path || !blurhash || !description) {
            return res.status(400).json({ success: false, message: "Path, blurhash and description are required" })
        }

        let saveImage = await prisma.images.create({
            data: {
                user_id: isOkay.user?.user_id as number,
                image_url: path,
                image_blurhash: blurhash,
            },
        });

        if (!saveImage) {
            return res.status(500).json({ success: false, message: "Something went wrong" })
        }

        let momentCreated = await prisma.anilar.create({
            data: {
                image_id: saveImage.id as number,
                description: description,
                user_id: isOkay.user?.user_id as number,
            },
        });

        if (!momentCreated) {
            return res.status(500).json({ success: false, message: "Something went wrong" })
        }

        res.status(200).json({
            success: true,
            message: "Moment created successfully",
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

        const { moment_id } = req.query;

        if (!moment_id) {
            return res.status(400).json({ success: false, message: "Moment id is required" })
        }

        const moment = await prisma.anilar.findUnique({
            where: {
                id: Number(moment_id),
            },
        });

        if (!moment) {
            return res.status(404).json({ success: false, message: "Moment not found" })
        }

        if (moment.user_id !== isOkay.user?.user_id) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const momentDeleted = await prisma.anilar.delete({
            where: {
                id: Number(moment_id),
            },
        });

        if (!momentDeleted) {
            return res.status(500).json({ success: false, message: "Something went wrong" })
        }

        res.status(200).json({
            success: true,
            message: "Moment deleted successfully",
        });

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const config = {
    api: {
        bodyParser: true,
    },
};