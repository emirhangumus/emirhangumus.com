import { validateUser } from '@/lib/functions/api/validateUser'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import jsdom from "jsdom"

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
    const { isLogged, user } = await validateUser(req, res)

    if (!isLogged) {
        res.status(401).end('Unauthorized')
        return
    }

    const schema = z.object({
        url: z.string().url(),
    })

    try {
        const { url } = schema.parse(req.query)

        // fetch url
        const response = await fetch(url)
        const html = await response.text()

        // parse html
        const parser = new jsdom.JSDOM(
            html,
        )

        const { document } = parser.window

        const title = document.querySelector('title')?.textContent
        const ogImage = document.querySelector('meta[property="og:image"]')
        const meta = document.querySelectorAll('meta')

        res.status(200).json({
            success: 1,
            link: url,
            meta: {
                title,
                image: {
                    url: ogImage?.getAttribute('content'),
                },
                description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
                meta: Array.from(meta).map((m) => {
                    // if name or property is null, skip
                    if (!m.getAttribute('name') && !m.getAttribute('property')) {
                        return null
                    }
                    return {
                        name: m.getAttribute('name'),
                        property: m.getAttribute('property'),
                        content: m.getAttribute('content'),
                    }
                }).filter((m) => m !== null),
            }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
