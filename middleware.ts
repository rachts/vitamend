import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rate limiting store (in production, use Redis)
const rateLimit = new Map()

function rateLimitMiddleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1"
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return null
  }

  const userLimit = rateLimit.get(ip)

  if (now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return null
  }

  if (userLimit.count >= maxRequests) {
    return new NextResponse("Too Many Requests", { status: 429 })
  }

  userLimit.count++
  return null
}

export default withAuth(
  function middleware(request) {
    // Apply rate limiting
    const rateLimitResponse = rateLimitMiddleware(request)
    if (rateLimitResponse) return rateLimitResponse

    // Security headers
    const response = NextResponse.next()

    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "origin-when-cross-origin")
    response.headers.set("X-XSS-Protection", "1; mode=block")

    // Role-based access control
    const { pathname } = request.nextUrl
    const token = request.nextauth.token

    // Admin routes
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    // Reviewer routes
    if (pathname.startsWith("/reviewer")) {
      if (token?.role !== "reviewer" && token?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    // NGO routes
    if (pathname.startsWith("/ngo")) {
      if (token?.role !== "ngo_partner" && token?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes
        const publicRoutes = [
          "/",
          "/about",
          "/blog",
          "/impact",
          "/marketplace",
          "/volunteer",
          "/transparency",
          "/legal/terms",
          "/legal/privacy",
          "/auth/signin",
          "/auth/signup",
        ]

        if (publicRoutes.includes(pathname)) {
          return true
        }

        // API routes that don't require auth
        if (
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/api/health") ||
          pathname.startsWith("/api/transparency") ||
          pathname.startsWith("/api/sustainability")
        ) {
          return true
        }

        // Protected routes require authentication
        return !!token
      },
    },
  },
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public|manifest.json|sw.js|icons).*)",
  ],
}
