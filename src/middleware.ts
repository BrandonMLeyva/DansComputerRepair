/**
 * Next.js Middleware: Admin Route Protection
 * ------------------------------------------
 * This middleware runs before any Next.js route is rendered.
 * Ensures that only authenticated users with "admin" role
 * are able to access admin-related routes.
 * 
 * 1. Checks if incoming request URL matches an admin route.
 * 2. Creates a supabase server client using cookies to read session data.
 * 3. Validates that the user is authentictaed (has supabase session) and has "admin" role in 'profiles' table.
 * 4. Redirects unauthorized users.
 */
import { NextResponse, NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Regular expressions representing admin-only routes.
// Patterns are tested against the request pathname.
// Current being "/dashboard" and "/admin-parts"
const ADMIN_MATCH = [/^\/dashboard(\/|$)/, /^\/admin-parts(\/|$)/];


// Function determining whether a given pathname matches one of the
// currently defined admin-only route patterns.
function isAdminPath(pathname: string) {
  return ADMIN_MATCH.some((re) => re.test(pathname));
}


// Middleware function executed automatically by Next.js on every request.
// Incoming Next.js request (includes cookies, URL, headers).
// Returns NextResponse object that either continues the request or redirects.
export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;

  // Skips processing if path is not admin route, assists with ensuring that
  // non-admin related routes are not slowed down by unwarranted auth checks.
  // Only guard admin paths essentially.
  if (!isAdminPath(nextUrl.pathname)) return NextResponse.next();


  // Initialize a base respone that can be used later to modify cookies if needed.
  const res = NextResponse.next();

  // Create supabase server client tied to the request's cookies.
  // Allows us to read and maintain user sessions securely.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Functions for telling supabase how to access and update cookies in Next.js
        get(name) {
          return cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Fetch user sessions from supabase to verify authentication status.
  // 1) Must be logged in
  const { data: { session } } = await supabase.auth.getSession();
  // If user is not logged in -> redirect 
  if (!session) {
    const url = new URL("/admin-log-in", req.url);
    // Assists with preserving intended destination so we can redirect after login.
    url.searchParams.set("redirectTo", nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Retrieve the user's profile to check their role.
  // 2) Must be admin
  const { data: profile, error } = await supabase
    .from("profiles")           // Fetching from profile table
    .select("role")             // Fetching from role column
    .eq("id", session.user.id)  // For matching authenticated user ID
    .single();                  // Expecting only one results

  // If user is logged in somehow, but not an admin, redirect to home.
  if (error || !profile || profile.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is authenticated and authorized -> allow access
  return res;
}

// Configuration for the current protected routes, add to as needed.
// Only routes matching specified patterns will run this logic.
// Note - ":path*" just means it applies to all subpaths under the base route.
// For example: based on the current defined paths in config, /dashboard/settings is also valid.
export const config = {
  matcher: ["/dashboard/:path*", "/admin-parts/:path*"],
};