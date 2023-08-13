type Props = {
    children: React.ReactNode;
    level?: "h1" | "h2" | "h3" | "p";
    className?: string;
};


export default function Text({ children, level = "p", className = "" }: Props) {
    return (
        <>
            {level === "h1" && (
                <h1 className={`lg:text-4xl text-3xl font-bold ${className}`}>{children}</h1>
            )}
            {level === "h2" && (
                <h2 className={`lg:text-3xl text-2xl font-bold ${className}`}>{children}</h2>
            )}
            {level === "h3" && (
                <h3 className={`lg:text-2xl text-xl font-bold ${className}`}>{children}</h3>
            )}
            {level === "p" && (
                <p className={`lg:text-base text-sm ${className}`}>{children}</p>
            )}
        </>
    );
}