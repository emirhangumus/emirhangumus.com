// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { z } from 'zod'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as bcrypt from 'bcrypt';
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

        const { token } = schema.parse(req.headers)

        return await new Promise<void>((resolve, reject) => {
            jwt.verify(
                token,
                process.env.JWT_SECRET ?? "emirhangumus",
                async (err, decoded) => {
                    if (err) {
                        res.status(401).json({
                            success: false,
                            message: 'Invalid token - 1'
                        })
                        return
                    }

                    if (!decoded) {
                        res.status(401).json({
                            success: false,
                            message: 'Invalid token - 2'
                        })
                        return
                    }

                    const user = await prisma.users.findUnique({
                        where: {
                            // @ts-ignore
                            id: decoded.id,
                        },
                    })

                    if (!user) {
                        res.status(404).json({
                            success: false,
                            message: 'User not found'
                        })
                        return
                    }

                    // create session
                    jwt.sign({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    }, process.env.JWT_SECRET ?? "emirhangumus", { expiresIn: '4h' }, async (err, token) => {
                        if (err) {
                            res.status(500).json({
                                success: false,
                                message: 'Internal server error'
                            })
                            return
                        }

                        res.status(200).json({
                            success: true,
                            message: 'Session created',
                            token,
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                            }
                        })
                        resolve();
                    })
                }
            )
        })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}