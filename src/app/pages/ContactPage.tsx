import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { H1, BodyText } from '@/app/components/shared/Typography';
import { MainButton } from '@/app/components/shared/MainButton';

export default function ContactPage() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionLabel>Contact</SectionLabel>

        <H1>Get in touch</H1>

        <div className="max-w-lg mt-8 space-y-6">
          <BodyText>
            Interested in our systems or consulting services? Reach out and
            we&apos;ll get back to you.
          </BodyText>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none resize-none"
                placeholder="Tell us about your idea"
              />
            </div>

            <MainButton type="submit">SEND MESSAGE</MainButton>
          </form>
        </div>
      </div>
    </section>
  );
}
