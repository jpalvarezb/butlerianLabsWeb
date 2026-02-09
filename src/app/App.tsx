import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SystemsPage from './pages/SystemsPage';
import ContactPage from './pages/ContactPage';
import ConsultingPage from './pages/ConsultingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PendingPage from './pages/PendingPage';
import PhiloPage from './pages/PhiloPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      /* ── Public routes ── */
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'systems', element: <SystemsPage /> },
      { path: 'consulting', element: <ConsultingPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'pending', element: <PendingPage /> },

      /* ── Product pages ── */
      { path: 'philo-001', element: <PhiloPage /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
