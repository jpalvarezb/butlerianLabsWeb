import { MainButton } from '@/app/components/shared/MainButton';
import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { SystemCard } from '@/app/components/shared/SystemCard';
import { H1, H2, BodyText } from '@/app/components/shared/Typography';

export default function AboutPage() {
  return (
    <>
      {/* ─── HEADER + DOGMA ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Dogma</SectionLabel>

          <H1>About Butlerian Labs</H1>


          <div className="max-w-2xl mt-8">
            <BodyText>
              Complexity isn't a feeling. It's structure.
            </BodyText>
            <BodyText>
              If the structure is visible, the system becomes usable.
            </BodyText>
          </div>
          <div className="mt-6">
            <MainButton href="/contact">CONTACT US</MainButton>
          </div>
        </div>
      </section>

      {/* ─── OUR BET ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Our bet</SectionLabel>

          <H2 className="mb-4 text-lg sm:text-xl lg:text-2xl">Human computer interaction</H2>
          <div className="max-w-2xl">
            <BodyText>
              The next step in HCI is not "more AI."
            </BodyText>
            <BodyText>
              It's interfaces that let humans see, touch, and verify what the system is doing.
            </BodyText>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE REFUSE ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Rejections</SectionLabel>

          <H2 className="mb-4 text-lg sm:text-xl lg:text-2xl">Anything that dulls cognition.</H2>
          <div className="max-w-2xl">
            <BodyText>
              Dashboards that flatten reality into charts.
            </BodyText>
            <BodyText>
              Black-box assistants that can't show their path.
            </BodyText>
            <BodyText>
              Abstraction as default.
            </BodyText>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE BUILD ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>What we build</SectionLabel>

          <H2 className="mb-4 text-lg sm:text-xl lg:text-2xl">Interfaces that make complexity legible.</H2>
          <div className="max-w-2xl">
            <BodyText>
              Human-first interactions for navigating ideas, systems, and evidence.
            </BodyText>
            <BodyText>Interactive structures that attach evidence and relationships.</BodyText>
          </div>
        </div>
      </section>

      {/* ─── CONSTRAINTS ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Constraints</SectionLabel>

          <H2 className="mb-4 text-lg sm:text-xl lg:text-2xl">Constraints</H2>
          <ul className="max-w-2xl space-y-2">
            <li className="flex items-start gap-3 text-sm leading-relaxed text-white/70 sm:text-base">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
              Structure before automation
            </li>
            <li className="flex items-start gap-3 text-sm leading-relaxed text-white/70 sm:text-base">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
              Evidence must remain visible
            </li>
            <li className="flex items-start gap-3 text-sm leading-relaxed text-white/70 sm:text-base">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
              Interaction should feel physical
            </li>
            <li className="flex items-start gap-3 text-sm leading-relaxed text-white/70 sm:text-base">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
              Outputs should travel
            </li>
          </ul>
        </div>
      </section>

      {/* ─── STATUS ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Status</SectionLabel>

          <H2 className="mb-4 text-lg sm:text-xl lg:text-2xl">Status</H2>
          <div className="max-w-2xl">
            <BodyText>
              PHILO-001 is live. FIELD-002 and METAG-003 are in development.
            </BodyText>
          </div>
        </div>
      </section>

      {/* ─── SYSTEMS ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Systems</SectionLabel>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <SystemCard
              id="PHILO-001"
              title="Knowledge field for researching philosophy, culture, and history."
              buttonLabel="Now live"
              buttonColor="#03ff8a"
              buttonHover
            >
              Directly explore ideas, relationships, and evidence.
            </SystemCard>

            <SystemCard
              id="PIANO-002"
              title="Spatial instrument interface."
              buttonLabel="Coming soon"
            >
              Turn a physical space into an instrument—touch regions to trigger
              sound, pattern, and rhythm.
            </SystemCard>

            <SystemCard
              id="METAG-003"
              title="Meta Graph MCP server with action receipts."
              buttonLabel="Coming soon"
            >
              Automate Facebook/Instagram through scoped auth, inspectable
              actions, and HITL.
            </SystemCard>
          </div>
        </div>
      </section>
    </>
  );
}
