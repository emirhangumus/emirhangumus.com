type Props = {
    align?: "left" | "center" | "right";
    className?: string;
};

export default function LoadingSpinner({ align = "center", className }: Props) {
    return (
        <div className={`flex justify-${align} ${className}`}>
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cinder-700"></div>
        </div>
    )
}