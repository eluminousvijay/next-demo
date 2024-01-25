import { NextResponse } from "next/server";

export function middleware(request) {
  const encodedToken = request.cookies.get("token");
  const decodedTokenString = encodedToken ? atob(encodedToken) : null;
  const decodedTokenObject = decodedTokenString
    ? JSON.parse(decodedTokenString)
    : null;
  console.log(">>>>>>>>>>>>>>>>>>>>", decodedTokenObject);
  console.log(">>>>>>>>>>>>>>>>>>>>", decodedTokenObject.token);
  const isUserLoggedIn = decodedTokenObject && decodedTokenObject?.token;
  // const isUserLoggedIn = true;

  const protectedPaths = ["/user", "/inquiry"];

  const requiresAuthentication = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (requiresAuthentication && !isUserLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return null;
}
