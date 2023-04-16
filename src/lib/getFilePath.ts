export function getFilePath(filePath: string): string {
    const startIndex = filePath.indexOf("uploads");
    if (startIndex === -1) {
        // If "public\\uploads" doesn't exist in the string, return the original string
        return filePath;
    }
    return '/' + filePath.substring(startIndex).replace(/\\/g, '/');
}
