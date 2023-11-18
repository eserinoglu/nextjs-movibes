import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/movies",
    "/movies/:id",
    "/search",
    "/sign-in",
    "/sign-up",
    "/api",
    "/api/saveUser",
    "/api/getFavorites",
    "/api/addFavorite",
    "/api/removeFavorite",
    "/api/getUser",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
