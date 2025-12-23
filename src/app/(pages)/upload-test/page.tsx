// File: app/page.tsx

"use client";

import { dbUpdateImgUsingId } from "@/app/actions/data";
import { getResizedImage, uploadImg } from "@/app/actions/img";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { ChangeEvent } from "react";
//////USE SERVER ACTIONS FOR FETCHING FROM PROTECTED API's..more secure and safer
// JUST IN THE SEND IN THE COOKIE CODE
// CHECK THE actions/server-cookie-jwt.ts file for the cookie code
export default function Home() {
  const { data: session } = useSession();
  if (!session?.user) return <h1>Not Found</h1>;

  // async function uploadImg(
  //   signedUrl: string,
  //   fileData: ArrayBuffer,
  //   file: File
  // ) {
  //   const resizedImage = await getResizedImage(fileData);

  //   const res = await fetch(signedUrl.toString(), {
  //     // headers: {
  //     //   origin: window.location.origin,
  //     //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //     //   "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //     // },
  //   });

  //   const data = await res.json();
  //   console.log(data);
  //   if (!data.signedUrl) return false;
  //   const body = new Blob([resizedImage], { type: file.type });

  //   const res1 = await fetch(data.signedUrl, {
  //     body,
  //     method: "PUT",
  //   });
  //   console.log(res1);
  //   if (res1.ok) {
  //     console.log("File uploaded");
  //     dbUpdateImgUsingId(session?.user?.id, {
  //       image: data.signedUrl.split("?")[0] as string,
  //     });
  //     console.log("Image URL updated");
  //   }
  //   return true;
  // }
  // async function getResizedImage(fileData: ArrayBuffer): Promise<Buffer> {
  //   const image = sharp(fileData);
  //   const metadata = await image.metadata();
  //   const ratio = metadata.width! / metadata.height!;
  //   const width = 300;
  //   const height = Math.round(width / ratio);
  //   return image.resize(width, height).jpeg({ quality: 80 }).toBuffer();
  // }
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null | undefined = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (fileData) {
        const presignedURL = new URL(
          "/api/presigned-upload",
          window.location.href
        );
        presignedURL.searchParams.set("fileName", file.name);
        presignedURL.searchParams.set("contentType", file.type);
        const smallerPayload = await getResizedImage(fileData as ArrayBuffer);
        const check = await uploadImg(
          presignedURL.toString(),
          smallerPayload,
          file
        );

        if (check) {
          console.log("File uploaded successfully");
        } else {
          console.log("File upload failed");
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };
  return <input onChange={uploadFile} type="file" accept="images/*" />;
}
