Migration notes: Convert Drizzle/Postgres usage to MongoDB (MERN)

Overview
- This project now includes an Express + Mongoose backend under `server/`.
- Existing Next frontend still imports `@/drizzle/*` and uses Drizzle query helpers.

Recommended next steps
1. Decide migration strategy:
   - API-first: Replace direct `@/drizzle/*` DB calls by calling the Express API endpoints. This requires changing server-side code in `src/app` and other server components to fetch from `http://localhost:4000/api/...` or using relative URLs when deployed behind a proxy.
   - Adapter-first: Create a compatibility adapter in `src/drizzle` that re-implements the minimal `db` and `schema` interfaces using Mongoose models. This keeps most imports unchanged but requires implementing query translation for helpers like `eq`, `and`, `desc`.

2. Implement models:
   - Add Mongoose models (JobInfo, Question, Interview, User) in `server/src/models` to match the existing `src/drizzle/schema` shapes.

3. Migrate queries:
   - For API-first: create Express routes for each resource (job-infos, questions, interviews, users) and update frontend/server-side code to call them.
   - For Adapter-first: implement `src/drizzle/db.ts` to translate Drizzle-style calls to Mongoose operations.

4. Remove Drizzle code and dependencies when migration is complete. Currently `drizzle.config.ts` is replaced with a placeholder and Drizzle packages were removed from `package.json`.

If you'd like, I can proceed to implement either the API-first migration (recommended) or the adapter shim — tell me which and I'll continue.
