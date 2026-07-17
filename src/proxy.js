import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) return NextResponse.redirect(new URL("/signin", request.url));

  const requestedRole = request.nextUrl.pathname.split("/")[2];
  if (["buyer", "seller", "admin"].includes(requestedRole) && requestedRole !== session.user.role) {
    return NextResponse.redirect(new URL(`/dashboard/${session.user.role}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
