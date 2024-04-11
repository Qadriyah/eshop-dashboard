import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("_session-token")?.value;
  if (sessionToken && request.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/home", request.url));
  }
  if (!sessionToken && request.nextUrl.pathname !== "/") {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/disclaimer",
    "/((?!public|static|assets|_next/public|_next/static|_next/assets|forgot-password|_next/forgot-password).*)",
  ],
};
