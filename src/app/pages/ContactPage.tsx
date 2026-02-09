import { useState } from 'react';
import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { H1, BodyText } from '@/app/components/shared/Typography';
import { MainButton } from '@/app/components/shared/MainButton';
import { useRecaptcha } from '@/app/hooks/useRecaptcha';
import { sendNotification } from '@/app/lib/sendNotification';

export default function ContactPage() {
  const { getToken } = useRecaptcha();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = await getToken('contact');
      await sendNotification('contact', token, { name, email, message });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionLabel>Contact</SectionLabel>

        <H1>Get in touch</H1>

        <div className="max-w-lg mt-8 space-y-6">
          {submitted ? (
            <BodyText>
              Message sent. We&apos;ll get back to you shortly.
            </BodyText>
          ) : (
            <>
              <BodyText>
                Interested in our systems or consulting services? Reach out and
                we&apos;ll get back to you.
              </BodyText>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-[0.2em] text-white/60 mb-2"
                  >
                    NAME
                  </label>
                  <input
                    id="name"
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
                    htmlFor="message"
                    className="block text-xs tracking-[0.2em] text-white/60 mb-2"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none resize-none"
                    placeholder="Tell us about your idea"
                  />
                </div>

                <MainButton type="submit" disabled={loading}>
                  {loading ? 'SENDING…' : 'SEND MESSAGE'}
                </MainButton>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
