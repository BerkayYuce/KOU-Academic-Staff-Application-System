import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IlanlarPage from './pages/IlanlarPage.jsx';
import BasvuruPage from './pages/BasvuruPage';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/ilanlar" /> : <LoginPage />} />
      <Route path="/ilanlar" element={user ? <IlanlarPage /> : <Navigate to="/" />} />
      <Route path="/basvuru/:ilanId" element={user ? <BasvuruPage /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
