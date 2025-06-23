import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateInvitationPage from './pages/CreateInvitationPage';
import ViewInvitationPage from './pages/ViewInvitationPage';
import { InvitationProvider } from './context/InvitationContext';

function App() {
  return (
    <InvitationProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateInvitationPage />} />
            <Route path="/invitation/:id" element={<ViewInvitationPage />} />
          </Routes>
        </div>
      </Router>
    </InvitationProvider>
  );
}

export default App;