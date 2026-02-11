import { useState } from 'react';
import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { MainButton } from '@/app/components/shared/MainButton';
import { H1, BodyText } from '@/app/components/shared/Typography';
import { supabase } from '@/app/lib/supabase';
import { useRecaptcha } from '@/app/hooks/useRecaptcha';
import { sendNotification } from '@/app/lib/sendNotification';
import { useAuth } from '@/app/contexts/AuthContext';
import { useIsMobile } from '@/app/components/ui/use-mobile';

const PHILO_URL = import.meta.env.VITE_PHILO_URL || 'https://philo.butlerian.xyz';

export default function PhiloPage() {
  const { getToken } = useRecaptcha();
  const { hasAccess, loading: authLoading } = useAuth();
  const isMobile = useIsMobile();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      // 1. Verify human via reCAPTCHA + notify admin (skipped on localhost)
      const isDev = window.location.hostname === 'localhost';
      if (!isDev) {
        const token = await getToken('access_request');
        await sendNotification('access_request', token, {
          name,
          email,
          occupation,
          company,
          message,
          product: 'PHILO-001',
        });
      }

      // 2. Create auth user (temp password — they'll set one later if approved).
      //    Product + message are passed in metadata so the handle_new_user
      //    trigger creates the product_access row automatically.
      const tempPassword = crypto.randomUUID();
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email,
        password: tempPassword,
        options: {
          data: {
            full_name: name,
            occupation,
            company,
            product: 'PHILO-001',
            message: message || null,
          },
        },
      });

      if (signUpErr) {
        setError(signUpErr.message);
        setLoading(false);
        return;
      }

      // Detect duplicate email: Supabase returns a user with empty identities
      // when email confirmation is enabled and the email already exists.
      if (data.user?.identities?.length === 0) {
        setInfo('An account with this email already exists. Please log in instead.');
        setLoading(false);
        return;
      }

      // Sign out so the temp session doesn't persist
      await supabase.auth.signOut().catch(() => {});

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Wait for auth to resolve before rendering anything
  if (authLoading) {
    return (
      <section className="flex items-center justify-center bg-black" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div className="text-center">
          <SectionLabel>Loading</SectionLabel>
        </div>
      </section>
    );
  }

  // ─── APPROVED: desktop/tablet = iframe; mobile (phone) = message ───
  if (hasAccess('PHILO-001')) {
    if (isMobile) {
      return (
        <section className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-black">
          <p
            className="text-center px-4 text-[#03ff8a] text-sm sm:text-base"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            PHILO-001 is a desktop and tablet experience.
          </p>
        </section>
      );
    }
    return (
      <section className="relative bg-black">
        {/* Error state */}
        {iframeError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80">
            <div className="text-center max-w-lg px-4">
              <SectionLabel>Error</SectionLabel>
              <BodyText className="mt-4 text-[#03ff8a]">
                Failed to load PHILO-001. Please refresh the page or contact support.
              </BodyText>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          src={PHILO_URL}
          className="w-full border-0"
          style={{ height: 'calc(100vh - 60px)', minHeight: '600px' }}
          title="PHILO-001 Knowledge Graph"
          onError={() => setIframeError(true)}
          allow="clipboard-write; camera; microphone"
        />
      </section>
    );
  }

  // ─── EVERYONE ELSE: hero + request access form ───
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-black">
        {/* Mobile: looping header video (poster shows until video loads, like desktop) */}
        <div className="relative block w-full md:hidden aspect-[9/16] max-h-[85vh] overflow-hidden bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/video/mobile_philo_header_poster.jpg"
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/video/mobile_philo_header.mp4" type="video/mp4" />
            <source src="/video/mobile_philo_header.mov" type="video/quicktime" />
          </video>
        </div>
        {/* Desktop: hand gestures video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hand_gestures_philo_poster.jpg"
          className="hidden md:block w-full -translate-y-5 transform-gpu"
        >
          <source src="/video/hand_gestures_philo_compressed.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex flex-col justify-end bg-black/50">
          <div className="mx-auto w-full max-w-[1200px] mt-[15px] px-4 pb-8 sm:px-6 sm:pb-16 md:mt-0 lg:px-8 lg:pb-20">
            <H1>Human Knowledge Graph</H1>

            <BodyText className="mt-6 max-w-2xl">
              Research ethics, metaphysics, epistemology, theology, anthropology, and history.
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

              {error && <p className="text-sm text-[#03ff8a]">{error}</p>}

              {info && <p className="text-sm text-[#03ff8a]">{info}</p>}

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
