import { NextResponse } from "next/server";

export function middleware(request) {
  const cookie = request.cookies.get("token");
  const isUserLoggedIn = cookie.value ? true : false;

  if (request.nextUrl.pathname.startsWith("/user") && !isUserLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return null;
}
