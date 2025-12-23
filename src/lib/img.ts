"use server";
import sharp from "sharp";
import { db } from "./db";
import { auth } from "@/auth";
import { dbUpdateImgUsingId } from "@/app/actions/data";


export async function uploadImg(signedUrl: string, fileData: ArrayBuffer, file: File) {
    const session = await auth();
    if (!session?.user) return false;

    const resizedImage = await sharp(fileData).jpeg({ quality: 80 }).resize(300, 300).toBuffer();
    console.log('signed url : ',signedUrl);

    fetch(signedUrl.toString())
    .then((res) => res.json())
    .then((res) => {
      const body = new Blob([resizedImage], { type: file.type });
      console.log('url : ',res.signedUrl.split('?')[0]);

      fetch(res.signedUrl, {
        body,
        method: "PUT",
      }).then(async () =>{
        console.log("File uploaded");
        // this needs to be updated for questions and other models
        dbUpdateImgUsingId(session?.user?.id, {
          image:res.signedUrl.split('?')[0] as string
        });
        console.log("Image URL updated");
      });
    });
    return true;
}

export async function deleteImg(signedUrl: string) {
  const session = await auth();
  if (!session?.user) return false;
  console.log(signedUrl);
  fetch(signedUrl.toString())
  .then((res) => res.json())
  .then((res) => {
    fetch(res.signedUrl, {
      method: "DELETE",
    }).then(async () => {
      console.log("File Deleted");
      dbUpdateImgUsingId(session?.user?.id, {
        image:null,
      });
      console.log("Image deleted");
    });
  });
  return true;
}
