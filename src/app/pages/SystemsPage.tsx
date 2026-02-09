import { SectionLabel } from '@/app/components/shared/SectionLabel';
import { SystemCard } from '@/app/components/shared/SystemCard';
import { H1, BodyText } from '@/app/components/shared/Typography';

export default function SystemsPage() {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionLabel>Systems</SectionLabel>

        <H1>Our Systems</H1>

        <BodyText className="mt-8 mb-12 max-w-2xl">
          Each system is a purpose-built interface for a specific domain of
          understanding.
        </BodyText>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <SystemCard
            id="PHILO-001"
            title="Spatial field for researching philosophy, culture, and history."
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
  );
}
