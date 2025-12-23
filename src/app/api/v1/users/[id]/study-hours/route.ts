import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Defensive: params may be undefined in some environments. Fall back to parsing URL.
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    let id: string | undefined = undefined;
    if (!id) {
      const usersIndex = parts.findIndex((p) => p === "users");
      if (usersIndex !== -1 && parts.length > usersIndex + 1) {
        id = parts[usersIndex + 1];
      }
    }

    if (!id) {
      return NextResponse.json({ error: "Missing user id in request" }, { status: 400 });
    }
    // Allow an easy test override: ?mockHours=42
    const mockHours = url.searchParams.get("mockHours");
    if (mockHours !== null) {
      const num = Number(mockHours) || 0;
      return NextResponse.json({ hours: num, userId: id, source: "mockQuery" });
    }

    // TODO: wire this to real data store / DB. For now return 0 hours by default.
    return NextResponse.json({ hours: 0, userId: id, source: "stub" });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
