import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminLayout } from './components/layout/AdminLayout';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PagesPage } from './pages/PagesPage';
import { LocationsPage } from './pages/LocationsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { NavigationPage } from './pages/NavigationPage';
import { SettingsPage } from './pages/SettingsPage';
import { BannersPage } from './pages/BannersPage';
import { ServicesPage } from './pages/ServicesPage';
import { SubServicesPage } from './pages/SubServicesPage';
import { ClientLogosPage } from './pages/ClientLogosPage';
import { TeamPage } from './pages/TeamPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogEditPage } from './pages/BlogEditPage';
import { BlogCategoriesPage } from './pages/BlogCategoriesPage';
import { FaqsPage } from './pages/FaqsPage';
import { CareersPage } from './pages/CareersPage';
import { EnquiriesPage } from './pages/EnquiriesPage';
import { MediaLibraryPage } from './pages/MediaLibraryPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/pages" element={<PagesPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/banners" element={<BannersPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/client-logos" element={<ClientLogosPage />} />
            <Route path="/team-members" element={<TeamPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/new" element={<BlogEditPage />} />
            <Route path="/blogs/edit/:id" element={<BlogEditPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/enquiries" element={<EnquiriesPage />} />
            <Route path="/media" element={<MediaLibraryPage />} />
            {/* Redirect decommissioned/unused pages */}
            <Route path="/projects" element={<Navigate to="/" replace />} />
            <Route path="/navigation" element={<Navigate to="/" replace />} />
            <Route path="/sub-services" element={<Navigate to="/" replace />} />
            <Route path="/testimonials" element={<Navigate to="/" replace />} />
            <Route path="/blog-categories" element={<Navigate to="/" replace />} />
            <Route path="/faqs" element={<Navigate to="/" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
