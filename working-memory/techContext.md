# Tech Context — Train Better Hub

## Stack
| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 14+ |
| Language | TypeScript | 5.x |
| Styling | TailwindCSS | 3.x |
| Auth | Supabase Auth | Shared project |
| Deployment | Vercel | — |
| Domain | `train-better.app` | — |

## Environment Variables (Expected)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_LC_URL=https://log.train-better.app
NEXT_PUBLIC_EL_URL=https://erg.train-better.app
```

## Domains
| App | Domain | Platform |
|---|---|---|
| Hub | `train-better.app` | Vercel |
| LC | `log.train-better.app` | Vercel |
| EL | `erg.train-better.app` | App Store / Play Store |

## Deployment
- Vercel auto-deploys from `main` branch
- Preview deployments on PRs
- Domain DNS managed at DreamHost, pointed to Vercel
