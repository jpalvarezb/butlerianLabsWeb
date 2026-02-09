import React, { useState } from 'react';

const NAV_LINKS = [
  { label: 'PHILO-001', href: '#' },
  { label: 'CONSULTING', href: '#' },
  { label: 'ABOUT US', href: '#' },
];

export default function ButlerianLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden font-mono">
      {/* Scanlines overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]">
        <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_3px)]" />
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.025]">
        <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,#fff_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,#fff_20px)]" />
      </div>

      {/* ─── MOBILE MENU BACKDROP ─── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ─── MOBILE SLIDE-IN PANEL ─── */}
      <div
        className={`fixed top-0 right-0 z-[60] h-full w-72 bg-black border-l border-white/10 transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end px-5 pt-5">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile nav links */}
        <nav className="flex flex-col gap-8 px-8 pt-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[13px] tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ─── MENU BAR ─── */}
      <nav className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
          {/* Logo + wordmark */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt=""
              className="h-10 w-10"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="text-lg sm:text-[21px] tracking-[0.3em] text-white">
              BUTLERIAN LABS
            </span>
          </div>

          {/* Nav links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] tracking-[0.2em] text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10">
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-black">
          {/* Video — full width, natural 16:9 aspect ratio, no cropping */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/video/butlerian_hero_poster.jpg"
            className="block w-full"
          >
            <source src="/video/butlerian_hero_2_compressed.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay + text */}
          <div className="absolute inset-0 flex flex-col justify-end bg-black/50">
            <div className="mx-auto w-full max-w-[1200px] px-4 pb-8 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
              <h1 className="mb-2 max-w-2xl font-sans text-2xl leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Human-first interactions.
                <br />
                <span className="opacity-50 block text-lg sm:text-2xl md:text-[35px] lg:text-[45px]">
                  Understanding, through structure.
                </span>
              </h1>

              <p className="mb-6 sm:mb-8 max-w-lg text-xs leading-relaxed text-white/70 sm:text-base">
                Discover ideas, data, and evidence
                <br />
                as structure you can see and control.
              </p>

              <a
                href="#systems"
                className="inline-block border-2 border-white px-6 sm:px-8 py-3 text-[11px] tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
              >
                REQUEST ACCESS
              </a>
            </div>
          </div>
        </section>

        {/* ─── WHAT BUTLERIAN IS ─── */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <SectionLabel>About</SectionLabel>

            <h2 className="mb-8 font-sans text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Interfaces for thinking
            </h2>

            <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-white/70 sm:text-base">
              <p>
              Butlerian Labs designs human-first interactions for cognition.
              </p>
              <p>
              Structure stays visible, and evidence stays attached.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SYSTEMS ─── */}
        <section id="systems" className="border-b border-white/10">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <SectionLabel>Systems</SectionLabel>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <SystemCard id="PHILO-001" title="Knowledge field for researching philosophy, culture, and history." buttonLabel="Now live" buttonColor="#03ff8a" buttonHover>
                Directly explore ideas, relationships, and evidence.
              </SystemCard>

              <SystemCard id="PIANO-002" title="Spatial instrument interface." buttonLabel="Coming soon">
              Turn a physical space into an instrument—touch regions to trigger sound, pattern, and rhythm.
              </SystemCard>

              <SystemCard id="METAG-003" title="Meta Graph MCP server with action receipts." buttonLabel="Coming soon">
              Automate Facebook/Instagram through scoped auth, inspectable actions, and HITL.
              </SystemCard>

            </div>
          </div>
        </section>

        {/* ─── OUTPUTS ─── */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <SectionLabel>Outputs</SectionLabel>

            <h2 className="mb-8 font-sans text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            Artifacts
            </h2>

            <div className="max-w-2xl">
              <p className="mb-6 text-sm leading-relaxed text-white/70 sm:text-base">
              What you do here produces outputs that travel.
              Exports, embeds, replays, and manifests. Understanding can leave 
              the interface and become part of your knowledge.

              </p>

              <p className="mb-4 text-sm leading-relaxed text-white/70 sm:text-base">
                Every session can produce reusable artifacts:
              </p>

              <ul className="mb-6 space-y-2 text-sm text-white/70 sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
                  sources
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
                  trails
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
                  views
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
                  conversations
                </li>
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
                Structure is part of the interface. Data, relationships, and layers all attached. 
              </TextBlock>

              <TextBlock title="Interaction is physical">
                Exploration happens with space, motion, and intent. Intead of clicks and filters.
              </TextBlock>

              <TextBlock title="Outputs become artifacts">
                Every session can create artifacts that belong to you. Export, embed, or revisit.
              </TextBlock>
            </div>

            <div className="mt-12 flex justify-center">
              <a
                href="#"
                className="inline-block border-2 border-white px-6 sm:px-8 py-3 text-[11px] tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
              >
                LEARN MORE
              </a>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="py-12 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="mb-2 text-[10px] tracking-[0.3em]">
                BUTLERIAN LABS
              </div>
              <p className="text-sm text-white/50">
                Human-first interfaces for complex systems
              </p>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 text-[10px] tracking-[0.2em]">
              <a
                href="#systems"
                className="text-white/60 transition-colors hover:text-white"
              >
                PHILO-001
              </a>
              <a
                href="#"
                className="text-white/60 transition-colors hover:text-white"
              >
                CONSULTING
              </a>
              <a
                href="#"
                className="text-white/60 transition-colors hover:text-white"
              >
                CONTACT
              </a>
            </div>

            <div className="mt-12 border-t border-white/10 pt-6 text-[9px] tracking-wider text-white/30">
              © 2026 Butlerian Labs
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ─── Local sub-components ─── */

function SectionLabel({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="text-[12px] tracking-[0.3em] uppercase text-[#03ff8a]">
        {children}
      </span>
      <div className="h-[3px] flex-1 bg-white" />
    </div>
  );
}

function TextBlock({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-base font-normal tracking-wide text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/60">{children}</p>
    </div>
  );
}

function SystemCard({
  id,
  title,
  children,
  buttonLabel,
  buttonColor = '#fff',
  buttonHover = false,
}: {
  id: string;
  title: string;
  children?: React.ReactNode;
  buttonLabel?: string;
  buttonColor?: string;
  buttonHover?: boolean;
}) {
  return (
    <div className="flex flex-col border border-white/20 p-6">
      <div className="mb-4 text-[13px] tracking-[0.25em] text-white/40">
        {id}
      </div>
      <h3 className="mb-3 text-sm leading-snug tracking-wide text-white">
        {title}
      </h3>
      <p className={`text-sm leading-relaxed text-white/50${buttonLabel ? ' mb-6' : ''}`}>{children}</p>
      {buttonLabel && (
        <div className="mt-auto">
          <PixelButton color={buttonColor} hover={buttonHover}>{buttonLabel}</PixelButton>
        </div>
      )}
    </div>
  );
}

function PixelButton({
  children,
  color = '#fff',
  hover = false,
}: {
  children?: React.ReactNode;
  color?: string;
  hover?: boolean;
}) {
  return (
    <button
      className={`inline-block cursor-pointer select-none border-2 bg-transparent px-2 py-1 text-[16px] tracking-[0.04em]${
        hover ? ' transition-colors duration-150' : ''
      }`}
      style={{
        borderColor: color,
        color: color,
        boxShadow: `2px 2px 0 0 ${color}`,
        ...(hover ? {} : {}),
      }}
      onMouseEnter={hover ? (e) => {
        e.currentTarget.style.backgroundColor = color;
        e.currentTarget.style.color = '#000';
      } : undefined}
      onMouseLeave={hover ? (e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = color;
      } : undefined}
    >
      {children}
    </button>
  );
}

function ConstraintItem({ children }: { children?: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/40" />
      {children}
    </li>
  );
}
