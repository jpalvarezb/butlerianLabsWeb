import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { MainButton } from '@/app/components/shared/MainButton';
import { H1, BodyText } from '@/app/components/shared/Typography';

export default function PendingPage() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionLabel>Status</SectionLabel>

        <H1>Request received</H1>

        <div className="max-w-2xl mt-8 space-y-5">
          <BodyText>
            Your access request is under review. We evaluate every request
            manually to ensure a good fit.
          </BodyText>
          <BodyText>
            You&apos;ll receive an email once your access has been approved.
          </BodyText>
        </div>

        <div className="mt-10">
          <MainButton href="/">BACK TO HOME</MainButton>
        </div>
      </div>
    </section>
  );
}
