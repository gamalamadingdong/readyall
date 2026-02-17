# SSO Handoff Contract (Hub ↔ LC)

> Created: 2026-02-17
> Status: Foundation implemented in Supabase; app integration pending.

## Objective
Enable one-time session bootstrapping between `readyall.org` (Hub) and `logbook.readyall.org` (LC) without exposing long-lived auth tokens in URLs.

## Implemented Backend Foundation
The shared Supabase project now includes:

- Table: `public.sso_handoffs`
  - One-time handoff token records
  - Source/target app metadata
  - Expiration + consumption tracking
- RPC: `public.create_sso_handoff(p_source_app, p_target_app, p_return_to, p_ttl_seconds)`
  - Authenticated user issues short-lived handoff token
- RPC: `public.consume_sso_handoff(p_token, p_expected_target, p_consumer_user_id)`
  - Marks token consumed atomically and returns source user context

## Flow Contract (Target)
### Hub → LC
1. Hub user is authenticated on `readyall.org`.
2. Hub calls `create_sso_handoff('hub', 'lc', returnTo, ttl)`.
3. Hub redirects to LC with `ssoToken=<token>` + desired return path.
4. LC server-side endpoint consumes token via `consume_sso_handoff`.
5. LC creates its local app session for returned `initiator_user_id`.
6. LC redirects user to requested LC path.

### LC → Hub
1. LC user is authenticated on `logbook.readyall.org`.
2. LC calls `create_sso_handoff('lc', 'hub', returnTo, ttl)`.
3. LC redirects to Hub with `ssoToken=<token>`.
4. Hub server-side endpoint consumes token.
5. Hub creates local app session for returned `initiator_user_id`.
6. Hub redirects to requested Hub path.

## Security Requirements
- Token TTL should stay short (default 120s; hard bounded 30–600s).
- Token consumption must be one-time and atomic (already enforced in RPC).
- Any app endpoint consuming token must validate expected target (`hub` vs `lc`).
- Never expose service-role key in browser code.
- Avoid forwarding long-lived `access_token` / `refresh_token` across domains.

## Remaining Work
1. Implement LC token-consume endpoint that creates LC session from source user id.
2. Update cross-app nav links to use handoff endpoint when source app already has a session.
3. Add telemetry:
   - `sso_handoff_issued`
   - `sso_handoff_consumed`
   - `sso_handoff_failed`
4. Add cleanup job for expired rows (`status='issued'` and `expires_at < now()`).

## Hub-side Implementation (Completed)
- Route: `/auth/bootstrap`
- Component: `HubSsoBootstrap`
- Behavior:
  1. Reads `ssoToken` + optional `returnTo` from query.
  2. Reads `access_token` + `refresh_token` from URL hash.
  3. Calls `supabase.auth.setSession(...)` on Hub origin.
  4. Calls `consume_sso_handoff(token, 'hub')`.
  5. Redirects to consumed `requested_return_to` (or fallback `returnTo`).

## LC → Hub URL Contract
When LC user is authenticated and wants to open Hub without re-login:

1. LC calls:
  - `create_sso_handoff('lc', 'hub', '/feedback', 120)`
  - receives `ssoToken`
2. LC reads current session tokens (`access_token`, `refresh_token`) from Supabase auth session.
3. LC redirects browser to:
  - `https://readyall.org/auth/bootstrap?ssoToken=<token>&returnTo=/feedback#access_token=<...>&refresh_token=<...>`
4. Hub bootstrap route establishes Hub session + consumes one-time token.

## Notes
- Current state remains dual-login by domain until token-consume endpoints are implemented in both apps.
- This contract intentionally separates "identity proof" (one-time handoff token) from "session creation" (target app local auth context).
