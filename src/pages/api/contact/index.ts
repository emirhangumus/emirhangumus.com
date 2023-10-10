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
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let limit = Number(req.query.limit) || 10;
		let page = Number(req.query.page) || 1;
		let skip = (page - 1) * limit;

		const contacts = await prisma.contact.findMany({
			orderBy: {
				created_at: 'desc',
			},
			skip,
			take: limit,
		})

		res.status(200).json({
			success: true, data: {
				contacts,
				pagination: {
					total: await prisma.contact.count(),
					limit,
					page,
				}
			}
		})
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message })
	}
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const contact = z.object({
			name: z.string(),
			email: z.string(),
			subject: z.string(),
			message: z.string(),
		})

		const data = contact.parse(req.body)

		const newContact = await prisma.contact.create({
			data,
		})

		res.status(201).json({
			success: true,
			message: 'Contact created successfully',
		})
	}
	catch (error: any) {
		res.status(400).json({
			success: false,
			error: error.message
		})
	}
}
