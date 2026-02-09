import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export function Layout() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden font-mono">
      {/* Scanlines overlay — subtle + softened */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.018] blur-[0.3px]">
        <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_3px)]" />
      </div>

      {/* Grid overlay — subtle + softened */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.012] blur-[0.4px]">
        <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,#fff_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,#fff_20px)]" />
      </div>

      <ScrollToTop />
      <Navbar />

      <div className="relative z-10">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
