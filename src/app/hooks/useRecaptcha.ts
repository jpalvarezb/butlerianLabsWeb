import { useEffect, useCallback } from 'react';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

/* Load the reCAPTCHA Enterprise script once, globally */
let scriptLoaded = false;

function loadScript() {
  if (scriptLoaded || !SITE_KEY) return;
  scriptLoaded = true;

  const el = document.createElement('script');
  el.src = `https://www.google.com/recaptcha/enterprise.js?render=${SITE_KEY}`;
  el.async = true;
  document.head.appendChild(el);
}

/**
 * Hook that provides a `getToken(action)` function.
 * Automatically loads the reCAPTCHA Enterprise script on first mount.
 *
 * Returns an empty string if the site key is not configured,
 * so forms still work in local dev without reCAPTCHA.
 */
export function useRecaptcha() {
  useEffect(() => {
    loadScript();
  }, []);

  const getToken = useCallback(async (action: string): Promise<string> => {
    if (!SITE_KEY || !window.grecaptcha?.enterprise) return '';

    return new Promise((resolve, reject) => {
      window.grecaptcha.enterprise.ready(() => {
        window.grecaptcha.enterprise
          .execute(SITE_KEY, { action })
          .then(resolve)
          .catch(reject);
      });
    });
  }, []);

  return { getToken };
}
