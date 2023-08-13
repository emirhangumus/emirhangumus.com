// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { validateUser } from '@/lib/functions/api/validateUser'
import { getFilePath } from '@/lib/getFilePath'
import { parseForm } from '@/lib/parse-form'
import prisma from '@/lib/prisma'
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

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

        const { fields, files } = await parseForm(req, {
            get: 'shortPath',
        });

        const file = files.media;
        let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;

        url = getFilePath(Array.isArray(url) ? url[0] : url);

        let momentCreated = await prisma.anilar.create({
            data: {
                image: Array.isArray(url) ? url[0] : url,
                description: fields.description as string,
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
        bodyParser: false,
    },
};