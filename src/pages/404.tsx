import Container from "@/components/shared/Container";
import Link from "next/link";

export default function Custom404() {
    return (
        <Container >
            <div className="flex flex-col items-center justify-center h-screen gap-2">
                <h1 className="text-3xl font-bold text-center">404</h1>
                <h2 className="text-xl font-semibold text-center">Böyle bir sayfa bulunamadı.</h2>
                <p className="text-gray-500 text-center text-sm">Bu sayfanın varolduğuna emin değilim.</p>
                <Link href="/" className="text-blue-500 hover:underline text-center">
                    Anasayfaya dön
                </Link>
            </div>
        </Container>
    );
}