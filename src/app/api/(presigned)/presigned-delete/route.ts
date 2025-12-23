import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { accessKeyId, client, secretAccessKey, s3BucketName } from '@/lib/clients3';
import { auth } from '@/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthRequest } from 'next-auth/lib';
// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//     const session = await auth(req, res);
//     console.log(session);
//     console.log(req);
//     console.log(res);
//     if (session) return NextResponse.json({ "msg":"You are logged in."});
//     return NextResponse.json({ "msg":"You are not logged in."});
//     // if (session == null) {
//     //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     // }
//     // if (!accessKeyId || !secretAccessKey || !s3BucketName || !client) {
//     //     return new Response(null, { status: 500 });
//     // }
//     // if (request.method !== 'GET') {
//     //     return NextResponse.json({error:"Not Allowed Method"}, { status: 405 });
//     // }
//     // const searchParams = request.query;
//     // const fileName = searchParams.fileName as string;
//     // if (!fileName) {
//     //     return new Response(null, { status: 500 });
//     // }
  
//     // const command = new DeleteObjectCommand({
//     //     Bucket: s3BucketName,
//     //     Key: fileName,
//     // });
//     // const signedUrl = await getSignedUrl(client as S3Client, command, { expiresIn: 3600 });
//     // if (signedUrl) return NextResponse.json({ signedUrl });
//     // return new Response(null, { status: 500 });


// }

export async function GET(req: NextRequest) {
    const session = await auth();
    // Check authentication
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    
    const searchParams = (req as NextRequest).nextUrl.searchParams;
    const fileName = searchParams.get('fileName');
    if (!fileName) {
        return NextResponse.json({message: "no file"}, { status: 500 });
    }

    const command = new DeleteObjectCommand({
        Bucket: s3BucketName,
        Key: fileName,
    });
    const signedUrl = await getSignedUrl(client as S3Client, command, { expiresIn: 3600 });
    if (signedUrl) return NextResponse.json({ signedUrl });
    return new Response(null, { status: 500 });
}  