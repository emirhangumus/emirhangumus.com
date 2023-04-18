export default function Divider({ className, removeBorder }: { className?: string, removeBorder?: boolean }) {

    if (removeBorder) {
        className = className + ' !border-0';
    }

    return (
        <div className={`border-t my-4 border-cinder-400 ${className}`} />
    )
}