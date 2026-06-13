/**
 * credentials — TTACart login creds, sourced from `.env`.
 *
 * `dotenv.config()` runs in playwright.config.ts before any spec loads, so
 * `process.env` is already populated by the time this module is imported. The
 * fallbacks are the public demo creds, so the suite still runs if a local
 * `.env` is missing (e.g. a fresh clone or CI without secrets configured).
 *
 *   import { credentials } from '@config/credentials';
 *   await loginPage.loginAs(credentials.standardUser, credentials.password);
 */

export const credentials = {
    // If the environment variable doesn't exist, it falls back to the string literal
    standardUser: process.env.STANDARD_USER ?? 'standard_user',
    password: process.env.TTA_SECRET ?? 'tta_secret', // or 'tta_secret' based on your login test
} as const;