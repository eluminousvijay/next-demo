import { NextResponse } from "next/server";

export function middleware(request) {
  const cookie = request.cookies.get("token");
  const isUserLoggedIn = !!cookie;

  const protectedPaths = ["/user", "/inquiry"];

  const requiresAuthentication = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (requiresAuthentication && !isUserLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return null;
}
