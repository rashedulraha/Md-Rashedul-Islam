import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

  // Delete cookies by setting maxAge: 0 or deleting them directly
  response.cookies.delete("admin_token");
  response.cookies.delete("is_admin");

  return response;
}
