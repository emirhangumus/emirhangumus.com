type Props = {
    children: React.ReactNode
    className?: string
}

export default function DecoratedBox({ children, className }: Props) {
    return (
        <div className={`w-full border border-cinder-800 rounded-lg bg-cinder-950 px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    )
}