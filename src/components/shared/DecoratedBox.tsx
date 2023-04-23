import Link from "next/link"

type Props = {
    children: React.ReactNode
    className?: string
    href?: string
    target?: string
}

export default function DecoratedBox({ children, className, href, target }: Props) {

    let c = `w-full border border-cinder-800 rounded-lg bg-cinder-950 bg-opacity-70 px-4 sm:px-6 lg:px-8 relative decoratedBox ${className}`

    if (href) {
        return (
            <Link href={href} className={c} target={target}>
                {children}
            </Link>
        )
    }

    return (
        <div className={c}>
            {children}
        </div>
    )
}