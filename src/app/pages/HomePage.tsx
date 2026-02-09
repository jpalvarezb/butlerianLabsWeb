import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { TextBlock } from '@/app/components/shared/TextBlock';
import { SystemCard } from '@/app/components/shared/SystemCard';
import { MainButton } from '@/app/components/shared/MainButton';
import { H1, H2, BodyText } from '@/app/components/shared/Typography';

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden -mt-15">
        <video autoPlay muted loop playsInline className="block w-full">
          <source src="/video/butlerian_hero_2.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex flex-col justify-end bg-black/50">
          <div className="mx-auto w-full max-w-[1200px] px-4 pb-8 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
            <H1>
              Human-first interactions.
              <br />
              <span className="opacity-50 block text-lg sm:text-2xl md:text-[35px] lg:text-[45px]">
                Understanding, through structure.
              </span>
            </H1>

            <BodyText className="mb-6 sm:mb-8 max-w-lg text-xs sm:text-base">
              Discover ideas, data, and evidence
              <br />
              as structure you can see and control.
            </BodyText>

            <MainButton href="/philo-001">REQUEST ACCESS</MainButton>
          </div>
        </div>
      </section>

      {/* ─── WHAT BUTLERIAN IS ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>About</SectionLabel>

          <H2>Interfaces for thinking</H2>

          <div className="max-w-2xl space-y-5">
            <BodyText>
              Butlerian Labs designs human-first interactions for cognition.
            </BodyText>
            <BodyText>
              Structure stays visible, and evidence stays attached.
            </BodyText>
          </div>
        </div>
      </section>

      {/* ─── SYSTEMS ─── */}
      <section id="systems" className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Systems</SectionLabel>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <SystemCard
              id="PHILO-001"
              title="Knowledge field for researching philosophy, culture, and history."
              buttonLabel="Now live"
              buttonColor="#03ff8a"
              buttonHover
              buttonHref="/philo-001"
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

      {/* ─── OUTPUTS ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>Outputs</SectionLabel>

          <H2>Artifacts</H2>

          <div className="max-w-2xl">
            <BodyText className="mb-6">
              What you do here produces outputs that travel. Exports, embeds,
              replays, and manifests. Understanding can leave the interface and
              become part of your knowledge.
            </BodyText>

            <BodyText className="mb-4">
              Every session can produce reusable artifacts:
            </BodyText>

            <ul className="mb-6 space-y-2 text-sm text-white/70 sm:text-base">
              {['sources', 'trails', 'views', 'conversations'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionLabel>How it works</SectionLabel>

          <div className="grid gap-12 sm:gap-16 lg:grid-cols-3 lg:gap-12">
            <TextBlock title="Structure is visible">
              Structure is part of the interface. Data, relationships, and layers
              all attached.
            </TextBlock>

            <TextBlock title="Interaction is physical">
              Exploration happens with space, motion, and intent. Instead of
              clicks and filters.
            </TextBlock>

            <TextBlock title="Outputs become artifacts">
              Every session can create artifacts that belong to you. Export,
              embed, or revisit.
            </TextBlock>
          </div>

          <div className="mt-12 flex justify-center">
            <MainButton href="/about">LEARN MORE</MainButton>
          </div>
        </div>
      </section>
    </>
  );
}
