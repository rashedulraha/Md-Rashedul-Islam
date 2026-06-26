import { NextResponse } from "next/server";
import { signJWT } from "@/lib/auth";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate JWT token (expires in 24 hours)
    const token = await signJWT({ userId: "admin-id", role: "admin" }, 86400);

    const response = NextResponse.json({ success: true, message: "Logged in successfully" });

    // Set secure HTTP-only cookie for server-side verification
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day in seconds
      path: "/",
    });

    // Set client-readable cookie to dynamically show/hide elements in the UI (like navbar links)
    response.cookies.set("is_admin", "true", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
