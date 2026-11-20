import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 text-slate-600">
        <LoadingSpinner size="lg" />
        <p className="text-sm font-medium">Connecting to MiscArchive Admin API...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-slate-900 flex flex-col relative overflow-x-hidden selection:bg-amber-200 selection:text-amber-950">
      {/* Ambient background decorative golden glow and hexagon watermarks */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft golden blurred glow at top-center */}
        <div className="absolute -top-32 left-1/3 w-[620px] h-[460px] bg-gradient-to-br from-amber-200/35 via-amber-100/25 to-transparent rounded-full blur-3xl" />
        {/* Subtle geometric hexagon shape watermark top right */}
        <svg
          className="absolute top-8 right-8 w-96 h-96 text-amber-500/[0.05] select-none"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <polygon points="100,10 185,55 185,145 100,190 15,145 15,55" />
        </svg>
        {/* Bottom subtle ambient polygon */}
        <svg
          className="absolute -bottom-24 right-1/4 w-[520px] h-[520px] text-amber-500/[0.035] select-none"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon points="100,10 185,55 185,145 100,190 15,145 15,55" />
        </svg>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
