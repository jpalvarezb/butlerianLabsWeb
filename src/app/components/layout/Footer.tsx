import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { label: 'PHILO-001', href: '/philo-001' },
  { label: 'CONSULTING', href: '/consulting' },
  { label: 'CONTACT', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="py-12 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-2 text-[10px] tracking-[0.3em]">
            BUTLERIAN LABS
          </div>
          <p className="text-sm text-white/50">
            Human-first interfaces for understanding complexity.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 sm:gap-8 text-[10px] tracking-[0.2em]">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-[9px] tracking-wider text-white/30">
          &copy; 2026 Butlerian Labs
        </div>
      </div>
    </footer>
  );
}
