import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next/types"
import { z } from "zod"

const schema = z.object({
    token: z.string()
})

interface ValidatedUser {
    sid: string;
    user_id: number;
    token: string;
    expire: Date;
}

export const validateUser = async (req: NextApiRequest, res: NextApiResponse): Promise<{ isLogged: boolean, user: ValidatedUser | null }> => {
    try {
        const { token } = schema.parse(req.headers);

        const user = await prisma.sessions.findFirst({
            where: {
                token
            },
        })

        if (!user) {
            return {
                isLogged: false,
                user: null,
            }
        }

        return {
            isLogged: true,
            user,
        }

    } catch (error: any) {
        return {
            isLogged: false,
            user: null,
        }
    }
} 