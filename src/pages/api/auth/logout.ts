// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { z } from 'zod'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken';

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
        const schema = z.object({
            token: z.string(),
        });

        const { token } = schema.parse(req.cookies)

        jwt.verify(
            token,
            process.env.JWT_SECRET ?? "emirhangumus",
            async (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid token'
                    })
                    return
                }

                if (!decoded) {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid token'
                    })
                    return
                }

                await prisma.sessions.deleteMany({
                    where: {
                        // @ts-ignore
                        user_id: decoded.id,
                    },
                })

                res.status(200).json({
                    success: true,
                    message: 'Logged out'
                })
            }
        )
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}