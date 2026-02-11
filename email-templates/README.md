# Email templates (Butlerian Labs branding)

These templates match the website’s typography and **MainButton** styling so Supabase/Resend emails look on-brand.

## approval-email.html

Used for the “access approved” email (create-account magic link).

- **Placeholders** (replace in your Edge Function or sending code):
  - `{{site_url}}` – Site origin for assets (e.g. `https://butlerian.xyz`). Used for the favicon image and must be absolute so the image loads in email clients.
  - `{{user_name}}` – Recipient’s display name (e.g. “Juan Pablo Alvarez”).
  - `{{create_account_url}}` – Full URL to the create-account page with token (e.g. `https://butlerian.xyz/create-account#access_token=...`). The favicon and CREATE ACCOUNT button both link here.

- **Design** (aligned with `src/app/components/shared/MainButton.tsx` and site font):
  - Font: monospace stack (SF Mono, Menlo, Monaco, Consolas, Courier New, monospace).
  - Background: `#000000`.
  - Body text: `#ffffff`, 16px.
  - Accent heading: `#13ff8b` (“ACCESS APPROVED”).
  - Button: 2px solid white border, 11px uppercase text, 0.2em letter-spacing, 12px vertical / 24px horizontal padding, transparent background — same as MainButton.

## Where to use

- **Supabase Edge Function** (e.g. `send-approval-email`): Read this HTML (or a built string), replace `{{user_name}}` and `{{create_account_url}}`, then send via Resend (or your provider) as the email body.
- **Resend**: Use the HTML as the body of the transactional email; pass variables into the template before sending.
