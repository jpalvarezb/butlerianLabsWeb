import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './app/components/layout/Layout';
import HomePage from './app/pages/HomePage';
import AboutPage from './app/pages/AboutPage';
import SystemsPage from './app/pages/SystemsPage';
import ConsultingPage from './app/pages/ConsultingPage';
import ContactPage from './app/pages/ContactPage';

/**
 * Called by vite-prerender-plugin at build time for each route.
 * Returns static HTML + discovered links for the crawl queue.
 */
export async function prerender(data: { url: string }) {
  const html = renderToString(
    <StaticRouter location={data.url}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="systems" element={<SystemsPage />} />
          <Route path="consulting" element={<ConsultingPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </StaticRouter>,
  );

  return {
    html,
    // Explicitly list marketing routes so the crawler hits them all
    links: new Set(['/', '/about', '/systems', '/consulting', '/contact']),
  };
}
