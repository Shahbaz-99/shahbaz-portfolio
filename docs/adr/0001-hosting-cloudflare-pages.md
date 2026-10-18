# ADR 0001: Host on Cloudflare Pages
**Status:** Accepted
**Context:** Free, static, global CDN needed; low latency is a goal.
**Decision:** Cloudflare Pages, auto-deploy from `main`, PR preview URLs. The homepage contact form uses a static `mailto:` link and does not require a backend.
**Consequences:** No server runtime is needed for homepage contact. Any future server-backed form requires a separate decision. Free-tier limits should be re-checked periodically.
