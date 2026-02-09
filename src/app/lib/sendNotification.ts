import { supabase } from './supabase';

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
  product?: string;
}

/**
 * Calls the `send-notification` Supabase Edge Function.
 *
 * 1. Verifies the reCAPTCHA v3 token server-side.
 * 2. Sends an email notification to admin@butlerian.xyz (unless type is `login_verify`).
 *
 * Throws on failure so callers can catch and display the error.
 */
export async function sendNotification(
  type: NotificationType,
  recaptchaToken: string,
  data?: NotificationData,
): Promise<{ success: boolean; score: number }> {
  const { data: res, error } = await supabase.functions.invoke(
    'send-notification',
    { body: { type, recaptchaToken, data } },
  );

  if (error) throw new Error(error.message);
  if (res?.error) throw new Error(res.error);

  return res;
}
