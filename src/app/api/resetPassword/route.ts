"use server";
import { db } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return new Response(
      JSON.stringify({ error: "Token and password required" }),
      {
        status: 400,
      }
    );
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (payload.purpose !== "forgot_password") {
      return new Response(JSON.stringify({ error: "Invalid token purpose" }), {
        status: 403,
      });
    }

    const email = payload.email as string;

    await db.user.update({
      where: { email },
      data: { password: newPassword },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
      status: 401,
    });
  }
}
