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
        case 'POST':
            await POST(req, res)
            break
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });

        const { email, password } = schema.parse(req.body)

        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
            return
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            res.status(401).json({
                success: false,
                message: 'Invalid password'
            })
            return
        }

        // create session
        jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        }, process.env.JWT_SECRET ?? "emirhangumus", { expiresIn: '12h' }, async (err, token) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
                return
            }

            if (!token) {
                res.status(500).json({
                    success: false,
                    message: 'Could not create session'
                })
                return
            }

            await prisma.sessions.deleteMany({
                where: {
                    user_id: user.id,
                }
            })

            jwt.sign({}, process.env.IMAGE_JWT_SECRET ?? "emirhangumus", { expiresIn: '12h' }, async (err, imageToken) => {

                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    })
                    return
                }

                let session = await prisma.sessions.create({
                    data: {
                        token,
                        user_id: user.id,
                        expire: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours
                    }
                })

                res.status(200).json({
                    success: true,
                    message: 'Giriş başarılı.',
                    token,
                    session,
                    imageToken,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    }
                })
            })
        })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}