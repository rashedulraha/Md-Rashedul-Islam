import { NextRequest, NextResponse } from "next/server";

import { verifyJWT } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes, but let /admin/login pass
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminToken = request.cookies.get("admin_token")?.value;

    if (!adminToken) {
      // Redirect to login page if no token is found
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyJWT(adminToken);
    if (!payload || payload.role !== "admin") {
      // Invalid token or wrong role, redirect to login page
      const loginUrl = new URL("/admin/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      // Clean up invalid cookies
      response.cookies.delete("admin_token");
      response.cookies.delete("is_admin");
      return response;
    }
  }

  // If a logged-in admin goes to /admin/login, redirect them to /admin
  if (pathname === "/admin/login") {
    const adminToken = request.cookies.get("admin_token")?.value;
    if (adminToken) {
      const payload = await verifyJWT(adminToken);
      if (payload && payload.role === "admin") {
        const adminDashboardUrl = new URL("/admin", request.url);
        return NextResponse.redirect(adminDashboardUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml, robots.txt (search engine files)
     */
    "/admin/:path*",
  ],
};
