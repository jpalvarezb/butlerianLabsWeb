import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './app/contexts/AuthContext';
import { Layout } from './app/components/layout/Layout';
import HomePage from './app/pages/HomePage';
import AboutPage from './app/pages/AboutPage';
import SystemsPage from './app/pages/SystemsPage';
import ConsultingPage from './app/pages/ConsultingPage';
import ContactPage from './app/pages/ContactPage';
import LoginPage from './app/pages/LoginPage';
import SignUpPage from './app/pages/SignUpPage';
import PendingPage from './app/pages/PendingPage';
import PhiloPage from './app/pages/PhiloPage';
import CreateAccountPage from './app/pages/CreateAccountPage';

/**
 * Called by vite-prerender-plugin at build time for each route.
 * Returns static HTML + discovered links for the crawl queue.
 */
export async function prerender(data: { url: string }) {
  const html = renderToString(
    <AuthProvider>
      <StaticRouter location={data.url}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="systems" element={<SystemsPage />} />
            <Route path="consulting" element={<ConsultingPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="pending" element={<PendingPage />} />
            <Route path="create-account" element={<CreateAccountPage />} />
            <Route path="philo-001" element={<PhiloPage />} />
          </Route>
        </Routes>
      </StaticRouter>
    </AuthProvider>,
  );

  return {
    html,
    links: new Set([
      '/',
      '/about',
      '/systems',
      '/consulting',
      '/contact',
      '/login',
      '/signup',
      '/pending',
      '/create-account',
      '/philo-001',
    ]),
  };
}
