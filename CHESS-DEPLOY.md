# Hosting Chess Battlefield at chess.lakshya.space

The 3D chess game lives in `public/chess/` (static — no build step of its own) and is
wired into this Next.js app so it serves at the **chess.lakshya.space** subdomain.

## What's already set up (in this repo)

- `public/chess/` — the whole game: `index.html`, `models/`, `lib/` (Stockfish), `assets/`.
  The HTML uses `<base href="/chess/">` so all its assets load from `/chess/*`.
- `next.config.ts` — a rewrite that serves `public/chess/index.html` at the **root of
  chess.lakshya.space** (only that host; `lakshya.space` is unaffected).
- The game is also reachable on the main domain at **lakshya.space/chess/**.

## Deploy steps (one-time)

1. **Commit & push** (Vercel auto-deploys on push):
   ```
   git add next.config.ts public/chess CHESS-DEPLOY.md
   git commit -m "Add Chess Battlefield game at /chess + chess subdomain"
   git push
   ```

2. **Add the subdomain in Vercel**
   - Vercel dashboard → your portfolio project → **Settings → Domains**
   - Add `chess.lakshya.space`.

3. **DNS** (where lakshya.space's DNS is managed)
   - If DNS is managed **by Vercel**: it's added automatically — nothing to do.
   - If managed at your **registrar/Cloudflare/etc.**: add the record Vercel shows you,
     normally a CNAME:  `chess`  →  `cname.vercel-dns.com`
   - Wait a few minutes for it to verify (Vercel shows a green check).

4. **Enable visitor analytics** (see below) — one click in the dashboard.

That's it — `https://chess.lakshya.space` will serve the game.

## Tracking who visits

This uses **Vercel Web Analytics** (free, privacy-friendly — page views, unique
visitors, countries, devices, referrers; no cookies, GDPR-safe). The tracking script
is already embedded in `public/chess/index.html`. To turn it on:

- Vercel dashboard → project → **Analytics** tab → **Enable**.

It starts collecting immediately for both the game and your portfolio. If you ever want
it on the portfolio React pages too, run `npm i @vercel/analytics` and add
`<Analytics/>` from `@vercel/analytics/next` to `src/app/layout.tsx` — the static game
page already reports on its own via the embedded script.

(If you'd rather use Google Analytics, the project already has `@next/third-parties`;
add `<GoogleAnalytics gaId="G-XXXX" />` and an equivalent gtag snippet to the chess HTML.)

## Updating the game later

The dev copy is `G:\3dchess`. After changing it, re-sync with one command (it copies
everything, re-injects `<base href="/chess/">`, and dedupes the black piece files):
```
pwsh scripts/sync-chess.ps1
```
Then commit & push as usual.
