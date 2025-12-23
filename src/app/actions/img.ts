"use server";
import { cookies } from "next/headers";
import sharp from "sharp";
import { auth } from "@/auth";
import { dbUpdateImgUsingId } from "@/app/actions/data";
import { getCookie } from "./server-cookie-jwt";
import { revalidateTag } from "next/cache";

function bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  return arrayBuffer as ArrayBuffer; // Explicitly cast to ArrayBuffer
}

export async function uploadImg(signedUrl: string, fileData: Buffer<ArrayBufferLike>, file: File) {
  const session = await auth();
  if (!session?.user) return false;
  const cookie = await getCookie();
  // const resizedImage = await getResizedImage(fileData);
  
  const res = await fetch(signedUrl.toString(), {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Cookie": cookie
    }
  }
  ); 

  const data = await res.json();
  console.log(data);
  if(!data.signedUrl) return false;


  const reducedFile = await getResizedImage(bufferToArrayBuffer(fileData));

  const body = new Blob([reducedFile], { type: file.type });
  const res1 = await fetch(data.signedUrl, {
    body,
    method: "PUT",
  });
  console.log(res1);
  if (res1.ok) {
    console.log("File uploaded");
    // this needs to be updated for questions and other models
    dbUpdateImgUsingId(session?.user?.id, {
      image: data.signedUrl.split('?')[0] as string
    });
    console.log("Image URL updated");
  }
    return true;
}


export async function uploadImgDB(signedUrl: string, fileData: ArrayBuffer, file: File) {
  const session = await auth();
  if (!session?.user) return false;
  const cookie = await getCookie();
  // const resizedImage = await getResizedImage(fileData);
  
  const res = await fetch(signedUrl.toString(), {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Cookie": cookie
    }
  }
  ); 

  const data = await res.json();
  console.log(data);
  if(!data.signedUrl) return false;

  const reducedFile = new Uint8Array(await getResizedImage(fileData));
  const body = new Blob([reducedFile], { type: file.type });

  let imageUrl;  

  const res1 = await fetch(data.signedUrl, {
    body,
    method: "PUT",
  });
  console.log(res1);
  if (res1.ok) {
    console.log("File uploaded");
    imageUrl =  data.signedUrl.split('?')[0];
    console.log("Image URL updated");
  }
  
    return imageUrl;
}


export async function deleteImageDB(signedUrl: string) {
  const session = await auth();
  if (!session?.user) return false;
  /// THIS IS THE LINE FOR THE AUTHENTICATION USING COOKIE....VV IMP FOR PROTECTED API ACCESS
  const cookie = await getCookie();
  // console.log(cookie);
  //since delete will occurr after this..cookie cache shouldn't be stored
  const res = await fetch(signedUrl.toString(), {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Cookie": cookie
    },
    cache:"no-store"
  }
); 

  const data = await res.json();
  console.log(data);
  if(!data.signedUrl) return false;
    
  const res1 = await fetch(data.signedUrl, {
    method: "DELETE",
  });

  if (res1.ok) {
     return true;
  }
  return false;
}


export async function getResizedImage(fileData: ArrayBuffer): Promise<Buffer> {
  const image = sharp(fileData);
  const metadata = await image.metadata();
  const ratio = metadata.width! / metadata.height!;
  const width = 300;
  const height = Math.round(width / ratio);
  return image.resize(width, height).jpeg({ quality: 80 }).toBuffer();
}
export async function deleteServerSide(signedUrl: string, origin: string) {
  const session = await auth();
  if (!session?.user) return false;
  /// THIS IS THE LINE FOR THE AUTHENTICATION USING COOKIE....VV IMP FOR PROTECTED API ACCESS
  const cookie = await getCookie();
  // console.log(cookie);
  //since delete will occurr after this..cookie cache shouldn't be stored
  const res = await fetch(signedUrl.toString(), {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Cookie": cookie
    },
    cache:"no-store"
  }
  ); 

  const data = await res.json();
  console.log(data);
  if(!data.signedUrl) return false;
    
  const res1 = await fetch(data.signedUrl, {
    method: "DELETE",
  });
  console.log(res1);

  if (res1.ok) {
    console.log("File deleted");
    dbUpdateImgUsingId(session?.user?.id, {
      image: null
    });
    console.log("Image URL delete");
  }
  revalidateTag(session.user.image);

  return true;
}