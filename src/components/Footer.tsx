import Link from "next/link";

const quotes = [
    ""
];

export default function Footer() {
    return (
        <footer className="bg-cinder-950 bg-opacity-10 mt-4 border-t border-cinder-800">
            <div className="max-w-7xl mx-auto py-8 px-4 overflow-hidden sm:px-6 lg:px-8">
                {/* <p className="text-center text-sm text-cinder-500">
                    {quotes[Math.floor(Math.random() * quotes.length)]}
                </p> */}
                <p className="mt-4 text-center text-xs text-cinder-500">
                    &copy; {new Date().getFullYear()} <Link href="/" className="hover:text-cinder-400">Emirhan Gümüş</Link>
                </p>
            </div>
        </footer >
    )
}