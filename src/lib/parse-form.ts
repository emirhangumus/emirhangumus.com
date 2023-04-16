import type { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import * as dateFn from "date-fns";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import { getFilePath } from "./getFilePath";
import prisma from "./prisma";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
    req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return await new Promise(async (resolve, reject) => {
        const uploadDir = join(
            process.env.ROOT_DIR || process.cwd(),
            `/public/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
        );

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(e);
                reject(e);
                return;
            }
        }

        const form = formidable({
            maxFiles: 10,
            maxFileSize: 1024 * 1024 * 10, // 10mb
            uploadDir,
            filename: (_name, _ext, part) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const filename = `${part.name || "unknown"}-${uniqueSuffix}.${mime.getExtension(part.mimetype || "") || "unknown"
                    }`;
                return filename;
            },
            filter: (part) => {
                console.log(part);

                return (
                    part.name === "media" && (part.mimetype?.includes("image") || false)
                );
            },
        });

        form.parse(req, async function (err, fields, files) {
            if (err) {
                reject(err);
            } else {
                const file = files.media;

                if (!file) {

                    const currentPostThumbnail = await prisma.posts.findUnique({
                        where: {
                            slug: req.query.slug as string,
                        },
                        select: {
                            image: true,
                        },
                    });

                    if (!currentPostThumbnail) {
                        reject("Post not found");
                        return;
                    }

                    fields.media = currentPostThumbnail.image.id.toString();

                    resolve({ fields, files });
                    return;
                }

                let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
                url = getFilePath(Array.isArray(url) ? url[0] : url);

                let data = await prisma.images.create({
                    data: {
                        user_id: 0,
                        image_url: url,
                        image_blurhash: "",
                    },
                });

                fields.media = data.id.toString();

                resolve({ fields, files });
            }
        });
    });
};
