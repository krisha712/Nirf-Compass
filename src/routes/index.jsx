import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import AnalysisPage from '@/pages/AnalysisPage';
import RoadmapPage from '@/pages/RoadmapPage';
import ReportPage from '@/pages/ReportPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import SearchHistoryPage from '@/pages/SearchHistoryPage';
import PolicyPage from '@/pages/PolicyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'analysis',
        element: <AnalysisPage />,
      },
      {
        path: 'roadmap',
        element: <RoadmapPage />,
      },
      {
        path: 'report',
        element: <ReportPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'history',
        element: <SearchHistoryPage />,
      },
      {
        path: 'privacy',
        element: <PolicyPage />,
      },
      {
        path: 'terms',
        element: <PolicyPage />,
      },
      {
        path: 'data-policy',
        element: <PolicyPage />,
      },
      {
        path: 'ai-transparency',
        element: <PolicyPage />,
      },
    ],
  },
]);
