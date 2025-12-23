import { NextResponse, type NextRequest } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { accessKeyId, client, secretAccessKey, s3BucketName } from '@/lib/clients3';
import { auth } from '@/auth';

// export async function GET(request: NextRequest) {
//     const origin = request.headers.get('origin');
//     if (!accessKeyId || !secretAccessKey || !s3BucketName || !client) {
//         return new Response(null, { status: 500 });
//     }

//     const searchParams = request.nextUrl.searchParams;
//     const fileName = searchParams.get('fileName');
//     const contentType = searchParams.get('contentType');
//     if (!fileName || !contentType) {
//         return new Response(null, { status: 500 });
//     }
  
//     const command = new PutObjectCommand({
//         Bucket: s3BucketName,
//         Key: fileName,
//         ContentType: contentType,
//     });
//     const signedUrl = await getSignedUrl(client as S3Client, command, { expiresIn: 3600 });
//     if (signedUrl) return NextResponse.json({ signedUrl }, {
//         // headers: {
//         //     'Access-Control-Allow-Origin': origin || "*",
//         //     'Content-Type': 'application/json',
//         // }
//     }
//     );
//     return new Response(null, { status: 500 });
// }



/// THE AUTH CALLING ONLY WORKS when fetched from a route or page file
/// and not from a middleware file
// ALSO NOTE VVV..IMP DONOT USE A SERVER ACTION FROM DIFF FILE to fetch the api..U WILL NOT BE ABLE TO AUTHENTICATE AND ACCESS THE SITE

// USE SOMETHING SIMILIAR TO THE ONE IN upload-test and delete-pf page files USE A ASYNC FUNCTION INSIDE THE CLIENT SIDE PAGE TO FETCH THE API...ONLY FIRST CHECK USING useSEssion() and auth





export async function GET(req: NextRequest) {
    const session = await auth();
    // Check authentication
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    if (!accessKeyId || !secretAccessKey || !s3BucketName || !client) {
        return new Response(null, { status: 500 });
    }
    if (req.method !== 'GET') {
        return NextResponse.json({ error: "Not Allowed Method" }, { status: 405 });
    }
    const searchParams = (req as NextRequest).nextUrl.searchParams;
    const fileName = searchParams.get('fileName');
    const contentType = searchParams.get('contentType');
    if (!fileName || !contentType) {
        return new Response(null, { status: 500 });
    }

    const command = new PutObjectCommand({
        Bucket: s3BucketName,
        Key: fileName,
        ContentType: contentType,
    });
    const signedUrl = await getSignedUrl(client as S3Client, command, { expiresIn: 3600 });
    if (signedUrl) return NextResponse.json({ signedUrl });
    return new Response(null, { status: 500 });
}
