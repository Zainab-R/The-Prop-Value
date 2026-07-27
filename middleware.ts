export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/estimate/:path*",
    "/history/:path*",
    "/admin/:path*",
  ],
};