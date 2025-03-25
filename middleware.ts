import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./utils/getCurrentUser";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  // Define allowed paths by role
  const allowedPathsByRole: {
    user: string[];

    admin: string[];
  } = {
    user: ["/feedback"],

    admin: ["/dashboard", "/feedback"],
  };
  console.log(user);
  // Redirect unauthenticated users to signup or login
  if (!user) {
    if (!["/signup", "/login"].includes(pathname)) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
    return NextResponse.next();
  }

  const role = user.role as keyof typeof allowedPathsByRole;

  console.log(role);

  // If the role is invalid or the path is not allowed for the user's role, redirect to home
  const allowedPaths = allowedPathsByRole[role] || [];
  console.log(allowedPaths);

  // Check if the user is trying to access their own dashboard
  const isAdminPath = pathname.startsWith("/admin-dashboard");
  const isAgentPath = pathname.startsWith("/agent-dashboard");

  // Only restrict paths that don't match the user's role
  if (
    (!allowedPaths.includes(pathname) && !(isAdminPath && role === "admin")) ||
    (role === "user" && isAdminPath)
  ) {
    const response = NextResponse.redirect(new URL("/", request.url));
    // response.cookies.delete("accessToken");
    // response.cookies.delete("refreshToken");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signup", "/login", "/feedback", "/dashboard"],
};
