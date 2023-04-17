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
        case 'POST':
            await POST(req, res)
            break
        default:
            res.status(405).json({ message: 'Method not allowed' })
            break
    }
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const isOkay = await validateUser(req, res)

        if (!isOkay.isLogged) {
            res.status(401).json({ message: 'Unauthorized' })
            return;
        }

        const { fields, files } = await parseForm(req, {
            get: 'shortPath',
        })

        res.status(200).json({
            success: true,
            data: {
                url: fields.media,
            }
        })
    } catch (error: any) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const config = {
    api: {
        bodyParser: false
    }
}