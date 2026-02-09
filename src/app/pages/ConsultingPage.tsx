import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { H1, BodyText } from '@/app/components/shared/Typography';
import { MainButton } from '@/app/components/shared/MainButton';

export default function ConsultingPage() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionLabel>Consulting</SectionLabel>

        <H1>Butlerian Consulting</H1>

        <div className="max-w-2xl mt-8 space-y-5">
          <BodyText>
            We build decision-making solutions, all the while keeping humans in the center of the process. 
          </BodyText>

        </div>

        {/* ─── DELIVERABLES ─── */}
        <div className="mt-16">
          <SectionLabel>Deliverables</SectionLabel>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col border border-white/20 p-6">
              <div className="mb-3 text-[13px] tracking-[0.25em] text-white/40">
                01
              </div>
              <h3 className="mb-2 text-sm tracking-wide text-white">
                Data foundation
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Modeling, pipelines, and quality controls.
              </p>
            </div>

            <div className="flex flex-col border border-white/20 p-6">
              <div className="mb-3 text-[13px] tracking-[0.25em] text-white/40">
                02
              </div>
              <h3 className="mb-2 text-sm tracking-wide text-white">
                Decision interfaces
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                UI with evidence and traceability built in.
              </p>
            </div>

            <div className="flex flex-col border border-white/20 p-6">
              <div className="mb-3 text-[13px] tracking-[0.25em] text-white/40">
                03
              </div>
              <h3 className="mb-2 text-sm tracking-wide text-white">
                Agentic automation
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                Actions with receipts and human oversight.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <MainButton href="/contact">GET IN TOUCH</MainButton>
        </div>
      </div>
    </section>
  );
}
