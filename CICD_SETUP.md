# CI/CD Setup (GitHub Actions)

This repository now includes:

- `.github/workflows/ci.yml`
- `.github/workflows/cd.yml`

The pipeline validates the frontend and backend, then deploys to your selected stack:

- Cloudflare Pages (frontend)
- Render (backend)
- Cloudflare R2 (image storage used by backend)

## Step 1: Confirm Branch Strategy

1. Use `main` as the production branch.
2. Open pull requests for all changes.

`CI` runs on every pull request and every push to `main`.

## Step 2: What CI Does

`CI` has two jobs:

1. Frontend job
2. Backend job

Frontend job:

1. Installs root dependencies with `npm ci`.
2. Runs `npm run lint`.
3. Runs `npm run build`.

Backend job:

1. Installs `server` dependencies with `npm ci`.
2. Checks syntax with `node --check index.js`.
3. Starts backend and calls `http://127.0.0.1:5001/api/health`.

## Step 3: Configure Deploy Hooks for CD

`CD` runs on push to `main` and can also run manually (`workflow_dispatch`).

It first re-validates lint/build checks, then triggers deploy hooks.

Add these repository secrets in GitHub:

1. `RENDER_DEPLOY_HOOK_URL` (required for backend CD)
2. `CLOUDFLARE_PAGES_DEPLOY_HOOK_URL` (optional if Pages is already connected to GitHub)

Where to get these hook URLs:

1. Render: Service Settings > Deploy Hook
2. Cloudflare Pages: Build hooks (optional) or use GitHub-connected auto deploy

If a secret is not configured, that deploy step is skipped.

## Step 4: Test the Pipeline

1. Push a feature branch and open a PR.
2. Confirm `CI` passes.
3. Merge to `main`.
4. Confirm `CD` runs and triggers deploy hooks.

## Step 5: Manual Deploy Controls

You can run `CD` manually from the Actions tab.

Manual inputs:

1. `deploy_frontend` (true/false)
2. `deploy_backend` (true/false)

Use this when you only want one side deployed.

## Step 6: Environment Variables on Hosting Platforms

Set these on the backend host:

1. `NODE_ENV=production`
2. `PORT` (if required by host)
3. `STORAGE_PROVIDER=r2`
4. `R2_ACCOUNT_ID`
5. `R2_ACCESS_KEY_ID`
6. `R2_SECRET_ACCESS_KEY`
7. `R2_BUCKET_NAME`
8. `R2_PUBLIC_BASE_URL`
9. `JWT_SECRET`
10. `ADMIN_USERNAME`
11. `ADMIN_PASSWORD_HASH`
12. `ALLOWED_ORIGINS`
13. `SMTP_HOST`
14. `SMTP_PORT`
15. `SMTP_SECURE`
16. `SMTP_USER`
17. `SMTP_PASS`
18. `MAIL_TO`
19. `MAIL_FROM` (optional)

Set this on the frontend host:

1. `VITE_API_URL` (for example, `https://api.yourdomain.com`)

Set these CORS origins:

1. Backend `ALLOWED_ORIGINS` should include your Cloudflare Pages URL and custom domain.
2. R2 bucket CORS should allow your Cloudflare Pages domain for `GET`.

## Step 7: R2 Migration Note

The backend upload endpoints now store team and service images in R2 when `STORAGE_PROVIDER=r2`.

1. Uploaded files are saved under `uploads/team/...` and `uploads/services/...` keys.
2. Deletions use the same asset keys, so old local paths and new R2 URLs both work.

## Step 8: Recommended Hardening

1. Protect `main` branch with required status checks: `CI / Frontend Lint and Build` and `CI / Backend Install and Health Check`.
2. Restrict who can push to `main`.
3. Rotate deploy hook URLs and secrets regularly.
