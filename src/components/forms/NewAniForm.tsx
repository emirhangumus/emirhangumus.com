import { useState } from "react";
import Text from "@/components/shared/Text";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import type ImageProviderResponse from "@/interfaces/ImageProviderResponse";

export default function NewAniForm() {

    const router = useRouter();

    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const uploadAni = async () => {
        if (!file) {
            setError("Lütfen bir görsel seçin.");
            return;
        }

        if (!description.length) {
            setError("Lütfen bir açıklama girin.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        let upload_image: ImageProviderResponse = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_PROVIDER_URL}/upload`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${Cookies.get('imageToken') || ''}`,
            },
            body: formData,
        }).then(res => res.json());

        if (!upload_image.success) {
            setError("Görsel yüklenirken bir hata oluştu.");
            return;
        }

        const res = await fetch(`/api/anilar`, {
            method: "POST",
            body: JSON.stringify({
                description: description,
                path: upload_image.data.path,
                blurhash: upload_image.data.blurhash,
            }),
            headers: {
                "Content-Type": "application/json",
                "token": Cookies.get("token") || "",
            },
        });

        if (res.status === 200) {
            setSuccess(true);
            router.push("/dashboard/anilar");
        } else {
            setError("Bir hata oluştu.");
        }

        setLoading(false);
    };

    const onFileChange = (files: FileList | null) => {
        if (!files) return;

        const file = files[0];
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <form className="mt-4 max-w-md mx-auto flex flex-col gap-4 pb-4" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                    {preview ? (
                        <>
                            <label htmlFor="file" className="border-dashed border-2 flex items-center justify-center rounded-lg p-2">
                                <img src={preview} alt="preview" className="w-full h-full object-cover rounded-lg" />
                            </label>
                        </>
                    ) : (
                        <>
                            <label htmlFor="file" className="border-dashed border-2 w-full aspect-[3/4] flex items-center justify-center rounded-lg">
                                <div className="flex flex-col gap-2">
                                    <Text className="text-center" level="h1">Görsel Seç</Text>
                                    <Text className="text-center" level="h1">JPG, JPEG, PNG</Text>
                                </div>
                            </label>
                        </>
                    )}
                </div>
                <input
                    id="file"
                    name="file"
                    type="file"
                    // accept only jpg, jpeg, png
                    accept="image/jpeg, image/png"
                    className="hidden"
                    onChange={e => onFileChange(e.target.files)}
                />
                <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Açıklama"
                    className="bg-cinder-900 border border-cinder-800 rounded p-2 outline-none w-full"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-cinder-800 hover:bg-cinder-900 px-4 py-1 rounded border border-cinder-700"
                    onClick={async () => await uploadAni()}
                    disabled={loading}
                >
                    Yükle
                </button>
            </form >
            {error && (
                <div className="mt-4 max-w-md mx-auto flex flex-col gap-4 py-4">
                    <Text level="p" className="text-white bg-red-800 rounded px-2 py-1">Hata: {error}</Text>
                </div>
            )}
        </>
    );
}