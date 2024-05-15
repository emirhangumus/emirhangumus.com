// import type { NextApiRequest } from "next";
// import mime from "mime";
// import { join } from "path";
// import * as dateFn from "date-fns";
// import formidable from "formidable";
// import { mkdir, stat } from "fs/promises";
// import { getFilePath } from "./getFilePath";
// import prisma from "./prisma";

// export const FormidableError = formidable.errors.FormidableError;

// type parseFormOptions = {
//     get: 'id' | 'shortPath' | 'fullPath';
// };

// export const parseForm = async (
//     req: NextApiRequest,
//     options = {
//         get: "shortPath",
//     } as parseFormOptions
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//     return await new Promise(async (resolve, reject) => {
//         const form = new formidable.IncomingForm({
//             multiples: true,
//             keepExtensions: true,
//             uploadDir: join(process.cwd(), "public", "uploads"),
//             maxFileSize: 10 * 1024 * 1024, // 10 MB
//             filename: (_name, _ext, part) => {
//                 const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//                 const filename = `${part.name || "unknown"}-${uniqueSuffix}.${mime.getExtension(part.mimetype || "") || "unknown"
//                     }`;
//                 return filename;
//             },
//             filter: (part) => {
//                 return (
//                     part.name === "media" && (part.mimetype?.includes("image") || false)
//                 );
//             },
//         });

//         form.parse(req, async function (err, fields, files) {
//             if (err) {
//                 reject(err);
//             } else {
//                 const file = files.media;

//                 if (!file && req.query.slug) {
//                     const currentPostThumbnail = await prisma.posts.findUnique({
//                         where: {
//                             slug: req.query.slug as string,
//                         },
//                         select: {
//                             image: true,
//                         },
//                     });

//                     if (!currentPostThumbnail) {
//                         reject("Post not found");
//                         return;
//                     }

//                     fields.media = currentPostThumbnail.image.id.toString();

//                     resolve({ fields, files });
//                     return;
//                 }

//                 if (options.get === "id") {
//                     let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
//                     url = getFilePath(Array.isArray(url) ? url[0] : url);

//                     const data = await prisma.images.create({
//                         data: {
//                             user_id: 0,
//                             image_url: url,
//                             image_blurhash: "",
//                         },
//                     });

//                     fields.media = data.id.toString();
//                     resolve({ fields, files });
//                     return;
//                 }

//                 if (options.get === "shortPath") {
//                     let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
//                     url = getFilePath(Array.isArray(url) ? url[0] : url);

//                     let data = await prisma.images.create({
//                         data: {
//                             user_id: 0,
//                             image_url: url,
//                             image_blurhash: "",
//                         },
//                     });

//                     fields.media = data.image_url;

//                     resolve({ fields, files });
//                     return;
//                 }

//                 if (options.get === "fullPath") {
//                     let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
//                     url = Array.isArray(url) ? url[0] : url;

//                     let data = await prisma.images.create({
//                         data: {
//                             user_id: 0,
//                             image_url: url,
//                             image_blurhash: "",
//                         },
//                     });

//                     fields.media = url;

//                     resolve({ fields, files });
//                     return;
//                 }

//                 resolve({ fields, files });
//             }
//         });
//     });
// };
