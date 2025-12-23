import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateProfileServer } from "@/app/actions/profile";

export async function GET() {
  return NextResponse.json({ ok: true, message: "User API reachable" });
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const body = await request.json();
    const { name, email, ph_no, image } = body;

    const updated = await updateProfileServer(userId, {
      name: name ?? null,
      email: email ?? null,
      ph_no: ph_no ?? null,
      image: image ?? null,
    });

    if (!updated) {
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data: updated });
  } catch (err: any) {
    console.error("/api/user PATCH error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
