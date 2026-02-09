const RECAPTCHA_API_KEY = Deno.env.get('RECAPTCHA_API_KEY')!;
const RECAPTCHA_PROJECT_ID = Deno.env.get('RECAPTCHA_PROJECT_ID')!;
const RECAPTCHA_SITE_KEY = Deno.env.get('RECAPTCHA_SITE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const ADMIN_EMAIL = 'admin@butlerian.xyz';
const FROM_EMAIL = 'Butlerian Labs <admin@butlerian.xyz>';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

/* ── Email builders ── */

interface EmailData {
  name?: string;
  email?: string;
  message?: string;
  occupation?: string;
  product?: string;
}

function buildEmail(
  type: string,
  data: EmailData,
): { subject: string; html: string } {
  switch (type) {
    case 'contact':
      return {
        subject: `[Contact] ${data.name ?? 'Someone'} — ${data.email}`,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${esc(data.name)}</p>
          <p><strong>Email:</strong> ${esc(data.email)}</p>
          <p><strong>Message:</strong></p>
          <p>${esc(data.message)}</p>
        `,
      };

    case 'access_request':
      return {
        subject: `[Access Request] ${data.name ?? 'Someone'} → ${data.product}`,
        html: `
          <h2>New access request</h2>
          <p><strong>Name:</strong> ${esc(data.name)}</p>
          <p><strong>Email:</strong> ${esc(data.email)}</p>
          <p><strong>Occupation:</strong> ${esc(data.occupation)}</p>
          <p><strong>System:</strong> ${esc(data.product)}</p>
        `,
      };

    case 'signup':
      return {
        subject: `[Signup] ${data.name ?? 'Someone'} — ${data.email}`,
        html: `
          <h2>New signup + access request</h2>
          <p><strong>Name:</strong> ${esc(data.name)}</p>
          <p><strong>Email:</strong> ${esc(data.email)}</p>
          <p><strong>Occupation:</strong> ${esc(data.occupation)}</p>
          <p><strong>System:</strong> ${esc(data.product)}</p>
        `,
      };

    default:
      return { subject: `[Butlerian] Notification`, html: '<p>Event logged.</p>' };
  }
}

function esc(val?: string): string {
  return (val ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ── Handler ── */

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, recaptchaToken, data } = await req.json();

    // 1. Verify reCAPTCHA Enterprise token
    const assessmentUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${RECAPTCHA_API_KEY}`;

    const verifyRes = await fetch(assessmentUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: {
          token: recaptchaToken,
          siteKey: RECAPTCHA_SITE_KEY,
          expectedAction: type === 'login_verify' ? 'login' : type,
        },
      }),
    });

    const assessment = await verifyRes.json();
    const tokenValid = assessment.tokenProperties?.valid === true;
    const score = assessment.riskAnalysis?.score ?? 0;

    if (!tokenValid || score < 0.5) {
      return new Response(
        JSON.stringify({ error: 'Human verification failed. Please try again.' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    // 2. Send email notification (skip for login — verification only)
    if (type !== 'login_verify') {
      const { subject, html } = buildEmail(type, data ?? {});

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject,
          html,
        }),
      });

      if (!emailRes.ok) {
        const errBody = await emailRes.text();
        console.error('Resend error:', errBody);
        return new Response(
          JSON.stringify({ error: 'Failed to send notification.' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, score }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    console.error('Edge function error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
