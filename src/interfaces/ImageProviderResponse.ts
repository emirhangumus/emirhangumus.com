interface ImageProviderResponseBase {
    success: false;
    error: string;
}

interface ImageProviderResponseSuccess {
    success: boolean;
    data: {
        path: string;
        blurhash: string;
    };
    error?: string;
}

type ImageProviderResponse = ImageProviderResponseBase | ImageProviderResponseSuccess;

export default ImageProviderResponse;