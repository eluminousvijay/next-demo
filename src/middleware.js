import { NextResponse } from "next/server";

export function middleware(request) {
  const encodedToken = request.cookies.get("token");
  const decodedTokenString = encodedToken ? atob(encodedToken.value) : null;
  const checkToken = () => {
     try {
       JSON.parse(decodedTokenString);
     } catch (e) {
       return false;
     }
     return true;
  } 
  const decodedTokenObject = decodedTokenString && checkToken() ? JSON.parse(decodedTokenString) : null; 
  const isUserLoggedIn = decodedTokenObject && decodedTokenObject.token;
  const protectedPaths = ["/user", "/inquiry"];

  const requiresAuthentication = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (requiresAuthentication && !isUserLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const otherPaths = ["/login"];

  const withoutAuth = otherPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (withoutAuth && isUserLoggedIn) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  return null;
}
