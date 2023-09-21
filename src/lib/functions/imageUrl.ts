export default function imageUrl(url: string) {
    if (url.includes('http')) {
        return url;
    }
    return `${process.env.NEXT_PUBLIC_IMAGE_PROVIDER_URL}/${url}`;
}
