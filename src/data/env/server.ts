import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

export const env = createEnv({
  server: {
    // Make server env vars optional for local development; the app will
    // continue to work with the in-memory dev server or when a MongoDB
    // backend is used. Production should provide required secrets.
    DB_PASSWORD: z.string().min(1).optional(),
    DB_HOST: z.string().min(1).optional(),
    DB_PORT: z.string().min(1).optional(),
    DB_USER: z.string().min(1).optional(),
    DB_NAME: z.string().min(1).optional(),
    ARCJET_KEY: z.string().min(1).optional(),
    CLERK_SECRET_KEY: z.string().min(1).optional(),
    HUME_API_KEY: z.string().min(1).optional(),
    HUME_SECRET_KEY: z.string().min(1).optional(),
    GEMINI_API_KEY: z.string().min(1).optional(),
  },
  createFinalSchema: env => {
    return z
      .object(env)
      .transform(val => {
        const {
          DB_HOST,
          DB_NAME,
          DB_PASSWORD,
          DB_PORT,
          DB_USER,
          ...rest
        } = val

        const hasDb = DB_HOST && DB_NAME && DB_PASSWORD && DB_PORT && DB_USER

        return {
          ...rest,
          DATABASE_URL: hasDb
            ? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
            : undefined,
        }
      })
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
})
