# SwarmUI — OWeb satellite

`app_id`: **swarmui** (register in OWeb `ecosystem-apps.ts` before App Store launch)  
Auth host: **https://auth.oweb.one**  
Control plane: **https://oweb.one**  
Vercel project: **swarmui-oweb** (`satellite/` root directory)

SwarmUI is a GPU-heavy C# + ComfyUI application. **Vercel hosts the OneID gate and launchpad only.** Point `NEXT_PUBLIC_SWARMUI_BACKEND_URL` at your RunPod, Vast, or Docker engine.

## Architecture

| Layer | Host | Role |
| --- | --- | --- |
| Satellite (this folder) | Vercel | Login, SSO redeem, activation, redirect to engine |
| Engine | GPU provider / Docker | Full SwarmUI repo at repository root |

## Auth flows

| Path | Entry |
| --- | --- |
| Native | `/login` — shared Supabase Auth (`ao-supabase-auth`) |
| OWeb return | `https://oweb.one/login?launch=swarmui` |
| SSO redeem | `/sso?launch_token=…` → `POST /api/sso/redeem` → OWeb redeem API |

See OneWeb-LLC/oweb `docs/SATELLITE_ONBOARDING_KIT.md` and `docs/SATELLITE_AUTH_RETURN.md`.

## Required env (Vercel)

Copy One OS public keys from another satellite (e.g. `open-higgsfield-ai`). See `.env.example`.

| Variable | Required |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes |
| `NEXT_PUBLIC_OWEB_APP_URL` | Yes |
| `NEXT_PUBLIC_APP_URL` | Yes (production URL) |
| `NEXT_PUBLIC_SWARMUI_BACKEND_URL` | Yes for auto-launch to engine |

## Local dev

```bash
cd satellite
cp .env.example .env.local
# fill publishable key from One OS
npm install
npm run dev
```
