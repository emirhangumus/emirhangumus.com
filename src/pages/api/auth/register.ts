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
	try {
		const schema = z.object({
			name: z.string(),
			password: z.string(),
			email: z.string().email(),
		});

		const data = schema.parse(req.body);

		const user = await prisma.users.findUnique({
			where: {
				email: data.email
			}
		})

		if (user) {
			return res.status(400).json({ success: false, message: "Email already exists" })
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(data.password, salt);

		const newUser = await prisma.users.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword
			}
		})

		res.status(200).json({ success: true, data: newUser })
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message })
	}
}