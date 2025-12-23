import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: Request) {
  const { razorpayOrderId, razorpaySignature, razorpayPaymentId, email, amount , courseId } = await req.json();
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (!isAuthentic) {
    return NextResponse.json({ message: "invalid payment signature", error: true }, { status: 400 });
  }

  // Save payment details to database

  // Send email to user
  // Update user's subscription status

    if (!email) return NextResponse.json({ message: "email is required", error: true }, { status: 400 });
    if(!amount) return NextResponse.json({ message: "amount is required", error: true }, { status: 400 });
    if(!courseId) return NextResponse.json({ message: "courseID is required", error: true }, { status: 400 });
    
    // await db.user.update({
    //     where: {
    //         email,
    //     },
    //     data: {
    //         Order: {
    //             create: {
    //                 totalAmount: amount
    //             },
    //         },
    //     },
    // });

    const user = await db.user.findUnique({
      where: { email }
  });
  
    if (!user) {
        console.log(`User with email ${email} not found`);
    }
  

    console.log('email : ',email);
    console.log('courseId : ',courseId);
    await db.enrollment.create({
        data: {
            user: {
                connect: { email },  
            },
            course: {
                connect: { id: courseId }, 
            },
            totalAmount: amount,
        },
    });
    

  return NextResponse.json({ message: "payment success", error: false }, { status: 200 });
}
