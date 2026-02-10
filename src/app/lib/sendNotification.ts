export type NotificationType =
  | 'contact'
  | 'access_request'
  | 'signup'
  | 'login_verify';

export interface NotificationData {
  name?: string;
  email?: string;
  message?: string;
  occupation?: string;
  company?: string;
  product?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const EDGE_TIMEOUT_MS = 20000;

/**
 * Calls the `send-notification` Supabase Edge Function via raw fetch.
 * Bypasses the Supabase client to avoid AbortError / "Failed to send a request
 * to the Edge Function" in production.
 *
 * 1. Verifies the reCAPTCHA Enterprise token server-side.
 * 2. Sends an email notification to admin@butlerian.xyz (unless type is `login_verify`).
 *
 * Throws on failure with a user-friendly message so callers can display it.
 */
export async function sendNotification(
  type: NotificationType,
  recaptchaToken: string,
  data?: NotificationData,
): Promise<{ success: boolean; score: number }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), EDGE_TIMEOUT_MS);

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/send-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ type, recaptchaToken, data }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message = body?.error ?? (res.status === 408 || res.status === 504 ? 'Request timed out. Please try again.' : 'Unable to send. Please try again.');
      throw new Error(message);
    }

    if (body?.error) throw new Error(body.error);

    return body;
  } catch (e) {
    clearTimeout(timeoutId);
    if (e instanceof Error) {
      if (e.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw e;
    }
    throw new Error('Something went wrong. Please try again.');
  }
}
