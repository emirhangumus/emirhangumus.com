import { Inter } from 'next/font/google'
import Header from './Header'
import BackgroundBlob from './BackgroundBlob';
import LoadingProgress from './LoadingProgress';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LoadingProgress />
            <BackgroundBlob />
            <Header />
            <div className={`relative z-10 min-h-screen ${inter.className}`}>
                <main>{children}</main>
            </div>
            <Footer />
        </>
    )
}