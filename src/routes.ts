/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/api/webhooks/ls",
  "/api/ai-analysis/generate",
  "/rankings",
  "/terms",
  "/privacy",
  "/support",
  "/sitemap.xml",
  "/favicon.ico",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/error",
  "/auth/verify-request",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
export const publicAnalysisPrefix = "/analysis/public";
/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/analysis";
