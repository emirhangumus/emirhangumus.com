// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { z } from 'zod'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as bcrypt from 'bcrypt';

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
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = schema.parse(req.body)

    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
        data: {
            email,
            password: hashedPassword,
        },
    })
    res.json(user)
}