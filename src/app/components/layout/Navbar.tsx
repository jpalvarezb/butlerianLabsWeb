import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { PixelButton } from '@/app/components/shared/PixelButton';
import { MobileMenu } from './MobileMenu';

export const NAV_LINKS = [
  { label: 'PHILO-001', href: '/philo-001' },
  { label: 'CONSULTING', href: '/consulting' },
  { label: 'ABOUT US', href: '/about' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <nav className="relative z-30 border-b border-white/10 bg-black">
        <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
          {/* Logo + wordmark */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt=""
              className="h-10 w-10"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="text-lg sm:text-[21px] tracking-[0.3em] text-white">
              BUTLERIAN LABS
            </span>
          </Link>

          {/* Nav links — centered, desktop only (lg+); tablets get mobile nav */}
          <div className="hidden lg:flex items-center gap-8 absolute left-[65%] -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[13px] tracking-[0.2em] text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Login — right, desktop only (lg+). Keys force fresh DOM on switch so Log in never inherits Log out hover (white). */}
          <div className="hidden lg:flex items-center">
            {user ? (
              <PixelButton key="nav-logout" hover onClick={() => signOut()}>
                Log out
              </PixelButton>
            ) : (
              <PixelButton key="nav-login" color="#13ff8b" hover onClick={() => navigate('/login')}>
                Log in
              </PixelButton>
            )}
          </div>

          {/* Hamburger — mobile + tablet (below lg) */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
          </button>
        </div>
      </nav>
    </>
  );
}
