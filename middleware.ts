import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./utils/getCurrentUser";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  // Define allowed paths by role
  const allowedPathsByRole: {
    user: string[];
    agent: string[];
    admin: string[];
  } = {
    user: [
      "/user-dashboard",
      "/profile",
      "/my-properties",
      "/favorite-properties",
      "/bookmarked-products",
    ],
    agent: [
      "/agent-dashboard",
      "/profile",
      "/my-properties",
      "/favorite-properties",
      "/agent-dashboard/properties-sold",
      "/add-payment",
      "/bookmarked-products",
      "/inquiries",
    ],
    admin: [
      "/profile",
      "/my-properties",
      "/favorite-properties",
      "/admin-dashboard/all-properties",
      "/admin-dashboard/all-products",
      "/admin-dashboard/all-users",
      "/admin-dashboard/all-orders",
      "/admin-dashboard/newsletters",
      "/inquiries",
      "/admin-dashboard/add-product",
      "/bookmarked-products",
      "/add-payment",
    ],
  };

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
    (!allowedPaths.includes(pathname) &&
      !(isAdminPath && role === "admin") &&
      !(isAgentPath && role === "agent")) ||
    (role === "user" && (isAdminPath || isAgentPath))
  ) {
    const response = NextResponse.redirect(new URL("/", request.url));
    // response.cookies.delete("accessToken");
    // response.cookies.delete("refreshToken");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/signup",
    "/login",
    "/user-dashboard",
    "/my-properties",
    "/favorite-properties",
    "/agent-dashboard",
    "/admin-dashboard",
  ],
};
