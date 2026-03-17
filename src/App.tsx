import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import StandardSearch from "@/pages/StandardSearch";
import StandardDetail from "@/pages/StandardDetail";
import CategoryList from "@/pages/CategoryList";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Disclaimer from "@/pages/Disclaimer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { StandardProvider } from '@/contexts/standardContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <StandardProvider>
        <div className="flex flex-col min-h-screen min-h-[900px] bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <Header />
          <main className="flex-grow px-4 py-6 sm:py-8 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/standards" element={<StandardSearch />} />
              <Route path="/standards/:id" element={<StandardDetail />} />
              <Route path="/categories/:category" element={<CategoryList />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </StandardProvider>
    </AuthContext.Provider>
  );
}
