import { EditorCoreInterface } from "@/interfaces/EditorCoreInterface";
import type ImageProviderResponse from "@/interfaces/ImageProviderResponse";
import { PostInterface } from "@/interfaces/PostInterface";
import imageUrl from "@/lib/functions/imageUrl";
import { url_slug } from "@/lib/functions/url_slug";
import type { OutputData } from "@editorjs/editorjs";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

type Props = {
    data?: PostInterface;
};

type EditorComponentProps = {
    initSave: (instance: EditorCoreInterface) => Promise<void> | void;
    content?: OutputData | null;
};

const Editor = memo(function EditorComponent({ initSave, content }: EditorComponentProps) {
    if (typeof window !== 'undefined') {
        const Editor = require('./Editor').default;
        return <Editor initSave={async (d: EditorCoreInterface) => await initSave(d)} content={content} />;
    }
    return null;
});


export default function BlogEditor({ data }: Props) {

    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [instance, setInstance] = useState<EditorCoreInterface | null>(null);
    const [content, setContent] = useState<OutputData | null>(null);
    const [media, setMedia] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>(data?.tags ? data.tags.map(tag => tag.name) : []);
    const [tag, setTag] = useState<string>('');

    useEffect(() => {
        if (data?.title) setTitle(data.title);
        if (data?.content) setContent(data.content);
        if (data?.image.image_url) setPreview(data.image.image_url);
    }, [data]);

    const save = async (content_: OutputData) => {
        if (content_.blocks.length === 0) return;
        if (title === '') return;
        if (!media && !preview) return;

        let upload_image: ImageProviderResponse | null = null;

        if (media) {
            const fd = new FormData();
            fd.append('image', media);

            upload_image = await fetch(process.env.NEXT_PUBLIC_IMAGE_PROVIDER_URL + '/upload', {
                method: 'POST',
                headers: {
                    "authorization": `Bearer ${Cookies.get('imageToken') || ''}`,
                },
                body: fd
            }).then(res => res.json());

            if (upload_image && !upload_image.success) {
                alert(upload_image.error);
                return;
            }
        }

        const res = await fetch('/api/blog' + (data ? `?slug=${data.slug}` : ''), {
            method: 'POST',
            headers: {
                'token': Cookies.get('token') || '',
            },
            body: JSON.stringify({
                content: content_,
                title,
                tags,
                image_url: upload_image ? upload_image.data.path : data?.image.image_url,
                image_blurhash: upload_image ? upload_image.data.blurhash : data?.image.image_blurhash
            })
        }).then(res => res.json());

        if (res.success) {
            router.push('/dashboard/blog');
        } else {
            alert(res.message);
        }
    };

    const initSave = async (i: EditorCoreInterface) => {
        setInstance(i);
    };

    const saveHandler = async () => {
        if (!instance) return;
        const savedData = await instance.save();

        await save(savedData);
    };

    const onKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (tag === '') return;
            setTags([...tags, tag]);
            setTag('');
        }

        if (e.key === 'Backspace' && tag === '') {
            setTags(tags.slice(0, tags.length - 1));
        }

        if (e.key === 'Escape') {
            setTag('');
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4 py-4">
                <div>
                    <input
                        type="text"
                        placeholder="Başlık"
                        className="w-full px-4 py-2 rounded bg-cinder-900 text-white outline-none border border-cinder-700"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className="mt-2">
                        <strong>Slug:</strong>
                        {' '}
                        {url_slug(title, { lower: true })}
                    </p>
                </div>

                <Editor initSave={initSave} content={data?.content || null} />

                <div>
                    {preview ? (
                        <label htmlFor="media" className="w-full h-64 bg-cinder-900 border border-cinder-700 rounded flex justify-center items-center cursor-pointer">
                            <img src={imageUrl(preview)} alt="preview" className="h-full w-full object-contain" />
                        </label>
                    ) : (
                        <label htmlFor="media" className="w-full py-2 bg-cinder-900 border border-cinder-700 rounded flex justify-center items-center cursor-pointer">
                            <p className="text-white">Görsel seçiniz...</p>
                        </label>
                    )}
                    <input
                        id="media"
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png"
                        onChange={(e) => {
                            if (e.target.files) {
                                setMedia(e.target.files[0]);
                                setPreview(URL.createObjectURL(e.target.files[0]));
                            }
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <button key={i} className="px-2 py-1 rounded bg-cinder-900 text-white" onClick={() => setTags(tags.filter((_, index) => index !== i))}>
                                {tag}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Etiketler"
                        className="w-full px-4 py-2 rounded bg-cinder-900 text-white outline-none border border-cinder-700"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyDown={(e) => onKeyDownTag(e)}
                    />
                </div>

                <div className='mt-4'>
                    <button onClick={() => saveHandler()} className='px-4 py-2 rounded bg-cinder-900 text-white outline-none border border-cinder-700'>Kaydet</button>
                </div>
            </div>
        </>
    )
}