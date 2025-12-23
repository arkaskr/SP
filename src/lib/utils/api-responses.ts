import { NextResponse } from "next/server";

// Success response utility
export const successResponse = (data: unknown, message: string, code: number = 200): NextResponse => {
  return NextResponse.json(
    {
      status: "success",
      message,
      data,
      code,
    },
    { status: code }
  );
};

// Error response utility
export const errorResponse = (message: string, code: number, error?: unknown): NextResponse => {
  return NextResponse.json(
    {
      status: "error",
      message,
      code,
      error,
    },
    { status: code }
  );
};