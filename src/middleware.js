import { NextResponse } from "next/server";

export function middleware(request) {

  const isUserLoggedIn = true;

  if (request.nextUrl.pathname.startsWith("/user") && !isUserLoggedIn) {
     return NextResponse.redirect(new URL("/login", request.url));
  }

  return null;
}
