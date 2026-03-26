import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("accessToken");

  const accessToken = cookie?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
