import { NextResponse } from "next/server";

export function middleware(request) {
  const cookie = request.cookies.get("token");
  const isUserLoggedIn = !!cookie; 
  if (request.nextUrl.pathname.startsWith("/user") && !isUserLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return null;
}
