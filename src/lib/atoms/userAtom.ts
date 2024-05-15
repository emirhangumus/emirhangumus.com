import { atom } from 'jotai'

type User = {
    id: number
    email: string
    name: string
    role: string
}

export const userAtom = atom<User | null>(null);