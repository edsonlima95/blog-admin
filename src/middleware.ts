import { NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  
  const signInURL = new URL("/login", request.url)
  const dashboardURL = new URL("/", request.url)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/auth/check-token/${token}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const result = await response.json()


  if (!token || result.statusCode === 401) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next()
    }

    return NextResponse.redirect(signInURL)
  }

  if (request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(dashboardURL)
  }
}

export const config = {
  matcher: ["/", "/login", "/category/:path*", "/posts/:path*"]
}
