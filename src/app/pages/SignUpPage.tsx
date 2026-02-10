import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { MainButton } from '@/app/components/shared/MainButton';
import { H1, BodyText } from '@/app/components/shared/Typography';
import { supabase } from '@/app/lib/supabase';
import { useRecaptcha } from '@/app/hooks/useRecaptcha';
import { sendNotification } from '@/app/lib/sendNotification';

const PRODUCTS = [
  { id: 'PHILO-001', label: 'PHILO-001 — Philosophy knowledge field' },
];

export default function SignUpPage() {
  const navigate = useNavigate();
  const { getToken } = useRecaptcha();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState('PHILO-001');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      // 1. Verify human via reCAPTCHA + notify admin (skipped on localhost)
      const isDev = window.location.hostname === 'localhost';
      if (!isDev) {
        const token = await getToken('signup');
        await sendNotification('signup', token, {
          name: fullName,
          email,
          occupation,
          company,
          message,
          product,
        });
      }

      // 2. Create auth user (temp password — they'll set one if approved).
      //    Product + message are passed in metadata so the handle_new_user
      //    trigger creates the product_access row automatically.
      const tempPassword = crypto.randomUUID();
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email,
        password: tempPassword,
        options: {
          data: {
            full_name: fullName,
            occupation,
            company,
            product,
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

      navigate('/pending');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionLabel>Access</SectionLabel>

        <H1>Request access</H1>

        <div className="max-w-lg mt-8 space-y-6">
          <BodyText>
            Create an account and request access to a Butlerian system.
            We review every request manually.
          </BodyText>

          {error && (
            <p className="text-sm text-[#03ff8a]">{error}</p>
          )}

          {info && (
            <p className="text-sm text-[#03ff8a]">{info}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs tracking-[0.2em] text-white/60 mb-2"
              >
                NAME
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs tracking-[0.2em] text-white/60 mb-2"
              >
                EMAIL
              </label>
              <input
                id="email"
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
                htmlFor="occupation"
                className="block text-xs tracking-[0.2em] text-white/60 mb-2"
              >
                OCCUPATION
              </label>
              <input
                id="occupation"
                type="text"
                required
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                placeholder="Researcher, historian, politician..."
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-xs tracking-[0.2em] text-white/60 mb-2"
              >
                COMPANY
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                placeholder="Optional"
              />
            </div>

            <div>
              <label
                htmlFor="product"
                className="block text-xs tracking-[0.2em] text-white/60 mb-2"
              >
                SYSTEM
              </label>
              <select
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full border border-white/20 bg-black px-4 py-3 text-sm text-white focus:border-white/50 focus:outline-none"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs tracking-[0.2em] text-white/60 mb-2"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
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

          <p className="text-sm text-white/50">
            Already have an account?{' '}
            <Link to="/login" className="text-[#03ff8a] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
