import { useState } from 'react';
import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { MainButton } from '@/app/components/shared/MainButton';
import { H1, BodyText } from '@/app/components/shared/Typography';
import { supabase } from '@/app/lib/supabase';
import { useRecaptcha } from '@/app/hooks/useRecaptcha';
import { sendNotification } from '@/app/lib/sendNotification';

export default function PhiloPage() {
  const { getToken } = useRecaptcha();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Verify human via reCAPTCHA + notify admin
      const token = await getToken('access_request');
      await sendNotification('access_request', token, {
        name,
        email,
        occupation,
        company,
        message,
        product: 'PHILO-001',
      });

      // 2. Create auth user (password-less — they'll set one later if approved)
      const tempPassword = crypto.randomUUID();
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email,
        password: tempPassword,
        options: { data: { full_name: name, occupation, company } },
      });

      if (signUpErr) {
        setError(signUpErr.message);
        setLoading(false);
        return;
      }

      // 3. Insert access request
      if (data.user) {
        await supabase.from('product_access').insert({
          user_id: data.user.id,
          product: 'PHILO-001',
          status: 'pending',
          message: message || null,
        });
      }

      // Sign out so the temp session doesn't persist
      await supabase.auth.signOut();

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hand_gestures_philo_poster.jpg"
          className="block w-full -translate-y-5 transform-gpu"
        >
          <source src="/video/hand_gestures_philo_compressed.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex flex-col justify-end bg-black/50">
          <div className="mx-auto w-full max-w-[1200px] px-4 pb-8 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
            <H1>Philosophical Research Field</H1>

            <BodyText className="mt-6 max-w-2xl">
              A spatial field for researching philosophy, culture, and history.
              Directly explore ideas, relationships, and evidence.
            </BodyText>
          </div>
        </div>
      </section>

      {/* ─── REQUEST ACCESS FORM ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Request access</SectionLabel>

          {submitted ? (
            <div className="max-w-lg">
              <BodyText>
                Request received. We review every submission manually and
                will reach out once your access is approved.
              </BodyText>
            </div>
          ) : (
            <div className="max-w-lg space-y-6">
              <BodyText>
                Submit your details and we&apos;ll review your request.
              </BodyText>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <form className="space-y-4" onSubmit={handleRequestAccess}>
                <div>
                  <label
                    htmlFor="req-name"
                    className="block text-xs tracking-[0.2em] text-white/60 mb-2"
                  >
                    NAME
                  </label>
                  <input
                    id="req-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="req-email"
                    className="block text-xs tracking-[0.2em] text-white/60 mb-2"
                  >
                    EMAIL
                  </label>
                  <input
                    id="req-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="req-occupation"
                    className="block text-xs tracking-[0.2em] text-white/60 mb-2"
                  >
                    OCCUPATION
                  </label>
                  <input
                    id="req-occupation"
                    type="text"
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                    placeholder="Professor, philosopher, student..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="req-company"
                    className="block text-xs tracking-[0.2em] text-white/60 mb-2"
                  >
                    COMPANY
                  </label>
                  <input
                    id="req-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label
                    htmlFor="req-message"
                    className="block text-xs tracking-[0.2em] text-white/60 mb-2"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="req-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none resize-none"
                    placeholder="Tell us why you're interested (optional)"
                  />
                </div>

                <MainButton type="submit" disabled={loading}>
                  {loading ? 'SUBMITTING…' : 'REQUEST ACCESS'}
                </MainButton>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
