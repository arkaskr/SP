import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { privateRoutes, authRoutes, adminRoutes, examprepapiRoutes, superadminRoutes } from "./route";
import { RoleType } from "@prisma/client";
const { auth } = NextAuth(authConfig);
// const allowedOrigins = [
//   'http://localhost:3000'
// ];
// const corsOptions = {
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// }
export const middleware = auth((req) => {
  const res = NextResponse.next();
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isPrivateRoute = privateRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  const isAdminRoutes = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // const isexamPrepApiRoutes = examprepapiRoutes.some((route) =>  nextUrl.pathname.startsWith(route));

  // const isSuperAdminRoutes = superadminRoutes.some((route) =>  nextUrl.pathname.startsWith(route));

  // if(isSuperAdminRoutes){
  //   if (!isLoggedIn) {
  //     const redirectUrl = new URL("/login", nextUrl);
  //     redirectUrl.searchParams.set("next", pathname);
  //     return NextResponse.redirect(redirectUrl);
  //   }

  //   const userRole = req?.auth?.user?.role?.toUpperCase();

  //   if (userRole !== "SUPERADMIN") {
  //     return NextResponse.redirect(new URL("/404", nextUrl));
  //   }
  // }

  // if(isexamPrepApiRoutes){
  //   if (!isLoggedIn) {
  //     const redirectUrl = new URL("/login", nextUrl);
  //     redirectUrl.searchParams.set("next", pathname);
  //     return NextResponse.redirect(redirectUrl);
  //   }

  //   const userRole = req?.auth?.user?.role?.toUpperCase();

  //   if (userRole !== "SUPERADMIN" && userRole !== "ADMIN") {
  //     return NextResponse.redirect(new URL("/404", nextUrl));
  //   }
  // }

  


  // console.log(req.cookies);
  if (isPrivateRoute) {
    if (!isLoggedIn) {
      const redirectUrl = new URL("/login", nextUrl);
      redirectUrl.searchParams.set("next", nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Admin route handling
  if (isAdminRoutes) {
    if (!isLoggedIn) {
      const redirectUrl = new URL("/login", nextUrl);
      redirectUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    const userRole = req?.auth?.user?.role?.toUpperCase();
    if (userRole as RoleType !== RoleType.ADMIN && userRole as RoleType !== RoleType.SUPERADMIN) {
      return NextResponse.redirect(new URL("/examprep/dashboard", nextUrl));
    }
    return res;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/examprep/dashboard", nextUrl));
    }
    return res;
  }

  // if (!req.nextUrl.pathname.startsWith("/api/auth") && req.nextUrl.pathname.startsWith("/api")) {
  //   // const origin = req.headers.get('origin');
  //   // console.log(origin);
  //   // if ((origin && !allowedOrigins.includes(origin)) || !origin) {
  //   //   return NextResponse.json({ "error": "CORS error" }, {
  //   //     status: 400,
  //   //     statusText: 'Bad Request',
  //   //     headers: {
  //   //       'Content-Type': 'text/plain',
  //   //     },
  //   //   })
  //   // }
  // }
  return res;
});

export const config = {
  // matcher: [
  //   '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  // ],
  matcher: ["/admin/:path*", "/examprep/:path*", "/test-razorpay/:path*", "/upload-test/:path*"],
};
