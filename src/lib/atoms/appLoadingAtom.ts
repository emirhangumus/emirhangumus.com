import { atom } from 'jotai'

type Loading = {
    loading: boolean
    message?: string
}

export const appLoadingAtom = atom<Loading>({ loading: true, message: 'Loading...' });