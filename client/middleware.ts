import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let isLoggedIn = req.cookies.get("access_token");
  const { pathname } = req.nextUrl;

  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
