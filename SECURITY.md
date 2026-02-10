# Security Overview

## ✅ Frontend Security (butlerianLabsWeb)

### Secrets Management
- ✅ **Environment variables only**: All sensitive values via `import.meta.env.VITE_*`
- ✅ **Git protection**: `.env.local` excluded via `.gitignore` (line 9)
- ✅ **Public keys only**: Supabase anon key and reCAPTCHA site key are safe to expose (client-side)
- ✅ **No API keys**: OpenAI and server secrets only in backend

### Required Environment Variables
```bash
# .env.local (never commit)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_RECAPTCHA_SITE_KEY=your-site-key
VITE_PHILO_URL=https://philo.butlerian.xyz
```

## ✅ Backend Security (philosiphai)

### CORS Protection
- ✅ **Domain whitelist**: Only `butlerian.xyz` and `www.butlerian.xyz` by default
- ✅ **Environment-driven**: `CORS_ORIGINS` env var for flexibility
- ✅ **No wildcards**: Explicit origins only, no `*`
- ✅ **Limited methods**: GET, POST, OPTIONS (no PUT, DELETE, PATCH)
- ✅ **HTTPS enforced**: `force_https = true` in fly.toml

### Secrets Management
- ✅ **Environment variables only**: OpenAI API key via `OPENAI_API_KEY`
- ✅ **Docker isolation**: `.env` excluded via `.dockerignore`
- ✅ **Git protection**: `.env` excluded via `.gitignore`
- ✅ **Fly secrets**: API keys set via `fly secrets set`
- ✅ **No hardcoded secrets**: All sensitive values from environment

### Network Security
- ✅ **Custom domain**: `philo.butlerian.xyz`
- ✅ **TLS certificates**: Managed by Fly.io
- ✅ **Origin validation**: CORS middleware rejects unauthorized domains

## Deployment Verification

### Test CORS Protection
```bash
# Should succeed (authorized origin)
curl -H "Origin: https://butlerian.xyz" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS https://philo.butlerian.xyz/health

# Should fail (unauthorized origin)
curl -H "Origin: https://malicious.com" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS https://philo.butlerian.xyz/api/query
```

### Verify Secrets
```bash
# Backend secrets (should not show actual values)
fly config show --app philo-butlerian

# Check frontend environment (in browser console)
# VITE_* variables are intentionally public (client-side)
console.log(import.meta.env.VITE_SUPABASE_URL)  // OK - public
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)  // OK - designed for client
```

## Security Checklist Before Deploy

- [ ] **Frontend**: `.env.local` has correct Supabase + reCAPTCHA keys
- [ ] **Backend**: `fly secrets set OPENAI_API_KEY="..."`
- [ ] **Backend**: Verify CORS_ORIGINS only has butlerian.xyz domains
- [ ] **Backend**: Confirm `.env` excluded from Docker build
- [ ] **DNS**: `philo.butlerian.xyz` points to Fly.io
- [ ] **Test**: Verify unauthorized origins rejected by CORS
- [ ] **Test**: Verify authorized iframe loads in /philo-001

## Safe Public Values

These values are **safe to expose** client-side:
- ✅ `VITE_SUPABASE_URL` - Public Supabase project URL
- ✅ `VITE_SUPABASE_ANON_KEY` - Public Supabase anon key (RLS enforced)
- ✅ `VITE_RECAPTCHA_SITE_KEY` - reCAPTCHA site key (verification server-side)
- ✅ `VITE_PHILO_URL` - Backend URL

These values **must remain secret** (server-only):
- ❌ Supabase service role key
- ❌ OpenAI API key
- ❌ JWT signing secret
- ❌ Resend API key
