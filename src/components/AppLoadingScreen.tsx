import LoadingSpinner from "./shared/LoadingSpinner";

export default function AppLoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <LoadingSpinner />
        </div>
    )
}