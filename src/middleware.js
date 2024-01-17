import { NextResponse } from "next/server";
// import { checkUserLoggedIn } from "./app/utils/authUtils";

export function middleware(request) {

 const isUserLoggedIn = true;
//   let isUserLoggedIn = null;
//  setTimeout(() => {
//      isUserLoggedIn = checkUserLoggedIn();
//   }, 3000);
  
console.log("middleware>>>>1", isUserLoggedIn);
  if (request.nextUrl.pathname.startsWith("/user") && !isUserLoggedIn) {
     return NextResponse.redirect(new URL("/login", request.url));
  }

  return null;
}
