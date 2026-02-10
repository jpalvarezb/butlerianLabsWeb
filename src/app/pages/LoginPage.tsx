import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { MainButton } from '@/app/components/shared/MainButton';
import { H1, BodyText } from '@/app/components/shared/Typography';
import { useAuth } from '@/app/contexts/AuthContext';

export default function LoginPage() {
  const { signIn, user, loading, accessStatus } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [pendingMessage, setPendingMessage] = useState(false);

  // After login succeeds, wait for auth state (including access) to resolve,
  // then redirect based on the user's product access status.
  useEffect(() => {
    if (!loginSuccess || loading || !user) return;

    const status = accessStatus('PHILO-001');

    if (status === 'approved') {
      navigate('/philo-001');
    } else if (status === 'pending') {
      // Stay on /login, show pending message
      setPendingMessage(true);
      setLoginSuccess(false);
      setSubmitting(false);
    } else {
      navigate('/');
    }
  }, [loginSuccess, loading, user, accessStatus, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPendingMessage(false);
    setSubmitting(true);

    try {
      const { error: err } = await signIn(email, password);

      if (err) {
        setError(err);
        setSubmitting(false);
      } else {
        // Signal that login succeeded — the useEffect above handles redirect
        setLoginSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setSubmitting(false);
    }
  };

  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionLabel>Account</SectionLabel>

        <H1>Log in</H1>

        <div className="max-w-lg mt-8 space-y-6">
          <BodyText>
            Sign in to access your Butlerian systems.
          </BodyText>

          {pendingMessage && (
            <p className="text-sm text-[#03ff8a]">Request pending approval</p>
          )}

          {error && (
            <p className="text-sm text-[#03ff8a]">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                htmlFor="password"
                className="block text-xs tracking-[0.2em] text-white/60 mb-2"
              >
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <MainButton type="submit" disabled={submitting}>
              {submitting ? 'SIGNING IN…' : 'SIGN IN'}
            </MainButton>
          </form>

          <p className="text-sm text-white/50">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-[#03ff8a] hover:underline">
              Request access
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
