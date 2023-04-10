export default function AppLoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
                <div className="flex items-center justify-center w-16 h-16 bg-cinder-600 rounded-full"></div>
                <div className="text-cinder-600">Yükleniyor...</div>
            </div>
        </div>
    )
}