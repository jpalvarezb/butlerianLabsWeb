import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtVerify } from 'jose';
import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { MainButton } from '@/app/components/shared/MainButton';
import { H1, BodyText } from '@/app/components/shared/Typography';
import { supabase } from '@/app/lib/supabase';

interface TokenPayload {
  user_id: string;
  email: string;
  product: string;
  exp: number;
}

export default function CreateAccountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      // Block direct access — only allow via email magic link
      navigate('/', { replace: true });
      return;
    }

    // Verify token (we don't have the secret on client, so we'll validate format only)
    // Real verification happens server-side in complete-account-setup
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }

      // Decode payload (without signature verification - server will verify)
      const payload = JSON.parse(atob(parts[1]));
      
      // Check expiry
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        setError('This invitation link has expired');
        setVerifying(false);
        return;
      }

      setTokenPayload(payload);
      setVerifying(false);
    } catch (err) {
      setError('Invalid invitation token');
      setVerifying(false);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const timeoutMs = 25000;
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out. Please try again.')), timeoutMs)
    );

    try {
      const token = searchParams.get('token')!;

      const invokePromise = supabase.functions.invoke('complete-account-setup', {
        body: { token, password },
      });
      const { data, error: setupError } = await Promise.race([invokePromise, timeoutPromise]);

      if (setupError || data?.error) {
        setError(data?.error || setupError.message);
        return;
      }

      const signInPromise = supabase.auth.signInWithPassword({
        email: tokenPayload!.email,
        password,
      });
      const { error: signInError } = await Promise.race([signInPromise, timeoutPromise]);

      if (signInError) {
        setError('Account created but sign-in failed. Please try logging in manually.');
        return;
      }

      navigate('/philo-001');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Account Setup</SectionLabel>
          <H1>Verifying invitation...</H1>
        </div>
      </section>
    );
  }

  if (error && !tokenPayload) {
    return (
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Account Setup</SectionLabel>
          <H1>Invalid invitation</H1>
          <div className="max-w-lg mt-8 space-y-6">
            <BodyText className="text-[#03ff8a]">{error}</BodyText>
            <MainButton href="/">BACK TO HOME</MainButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionLabel>Account Setup</SectionLabel>

        <H1>Create your account</H1>

        <div className="max-w-lg mt-8 space-y-6">
          <BodyText>
            Your access to <strong>{tokenPayload?.product}</strong> has been approved.
            Set your password to continue.
          </BodyText>

          {error && <p className="text-sm text-[#03ff8a]">{error}</p>}

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
                disabled
                value={tokenPayload?.email || ''}
                className="w-full border border-white/20 bg-black/50 px-4 py-3 text-sm text-white/50 cursor-not-allowed"
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
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs tracking-[0.2em] text-white/60 mb-2"
              >
                CONFIRM PASSWORD
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none"
                placeholder="Re-enter your password"
              />
            </div>

            <MainButton type="submit" disabled={loading}>
              {loading ? 'CREATING ACCOUNT…' : 'CREATE ACCOUNT'}
            </MainButton>
          </form>
        </div>
      </div>
    </section>
  );
}
