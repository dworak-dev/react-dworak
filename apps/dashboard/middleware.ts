import { dashboardRouteConfigs } from "@packages/shared/routes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = Object.values(dashboardRouteConfigs)
  .filter((r) => r.isProtected)
  .map((r) => r.rewrites)
  .flat();

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const authenticated = (await cookies()).get("auth")?.value === "true";

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !authenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// IMPORTANT: `mtrcs` should be a variable but next.js doesn't support that yet.
// learn more about it here: https://nextjs.org/docs/14/app/building-your-application/routing/middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|mtrcs).*)"],
};
