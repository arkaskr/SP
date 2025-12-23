// src/app/api/superadmin/dashboard/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const totalCourses = await prisma.course.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: { totalAmount: true }
    });

    const activeSubscriptions = await prisma.subscription.count({
      where: { isActive: true }
    });

    return NextResponse.json({
      totalUsers,
      totalCourses,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      activeSubscriptions
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
