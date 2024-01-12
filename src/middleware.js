import { NextResponse } from "next/server";

export function middleware(request) {
  
  console.log('middleware>>>>>>>>>>>');

  const isUserLoggedIn = /* Implement your logic to check if the user is logged in */ true;

  // if (request.nextUrl.pathname.startsWith("/user") && !isUserLoggedIn) {
  //   return NextResponse.redirect("/login");
  // }else{
  //   return NextResponse.redirect("/user");
  // }

  // if (request.nextUrl.pathname.startsWith("/dashboard") && !isUserLoggedIn) {
  //   return NextResponse.redirect("/login");
  // }

  return null;
}
