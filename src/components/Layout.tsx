import { Inter } from 'next/font/google'
import Header from './Header'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className={`${inter.className}`}>
                <main>{children}</main>
            </div>
        </>
    )
}