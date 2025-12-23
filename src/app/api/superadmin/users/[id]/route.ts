"use server";

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { checkAuthSuperAdmin } from "@/lib/utils/auth-check-in-exam-api";
import { TargetUserChangeValidationSchema } from "@/lib/utils/model-validation-schema";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const authResponse = await checkAuthSuperAdmin();
  if (authResponse) return authResponse;

  try {
    const { id: targetUserId } = await params;

    const user = await db.user.findUnique({
      where: {
        id: targetUserId,
      },
      select: { id: true, role: true },
    });

    if (!user) {
      return errorResponse("No user found", 404);
    }

    if (user.role === "SUPERADMIN") {
      return errorResponse("You cannot delete a superAdmin", 403);
    }

    await db.user.delete({
      where: {
        id: targetUserId,
      },
    });

    return successResponse({}, "User deleted successfully", 200);
  } catch (error) {
    return errorResponse("Internal Server Error", 500, error);
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const authResponse = await checkAuthSuperAdmin();
  if (authResponse) return authResponse;

  try {
    const { id: targetUserId } = await params;
    const body = await req.json();

    const validation = TargetUserChangeValidationSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse("Invalid Input", 400, validation.error);
    }

    const { targetUserRole } = validation.data;

    // Check if the target user exists
    const targetUser = await db.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return errorResponse("User not found", 404);
    }

    // Update the user's role
    const updatedUser = await db.user.update({
      where: { id: targetUserId },
      data: { role: targetUserRole },
      select: {
        id: true,
        name: true,
        email: true,
        ph_no: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    // Return success response
    return successResponse(updatedUser, "User role updated successfully", 200);
  } catch (error) {
    return errorResponse("Internal Server Error", 500, error);
  }
};
