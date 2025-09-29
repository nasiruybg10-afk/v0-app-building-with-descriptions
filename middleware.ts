import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected admin routes
  if (pathname.startsWith("/admin")) {
    const user = await getSession()

    if (!user) {
      return NextResponse.redirect(new URL("/login?redirect=/admin", request.url))
    }

    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
