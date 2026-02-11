import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';
import { PixelButton } from '@/app/components/shared/PixelButton';
import { NAV_LINKS } from './Navbar';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 z-[60] h-full w-72 bg-black border-l border-white/10 transition-transform duration-300 ease-in-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end px-5 pt-5">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile nav links */}
        <nav className="flex flex-col gap-8 items-start px-8 pt-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={onClose}
              className="text-[13px] tracking-[0.2em] text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <PixelButton
              key="menu-logout"
              hover
              className="w-fit max-w-[min(100%,280px)]"
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              LOG OUT
            </PixelButton>
          ) : (
            <PixelButton
              key="menu-login"
              color="#13ff8b"
              hover
              className="w-fit max-w-[min(100%,280px)]"
              onClick={() => {
                navigate('/login');
                onClose();
              }}
            >
              LOG IN
            </PixelButton>
          )}
        </nav>
      </div>
    </>
  );
}
