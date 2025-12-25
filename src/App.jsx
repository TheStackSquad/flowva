//src/App.jsx
import React, { useState, useEffect } from 'react';
import Dashboard from './pages/dashboard.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Sync modal state with authentication
  useEffect(() => {
    if (!loading && !user) {
    } else {
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="spinner w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-text-secondary mt-4 animate-pulse">Establishing Secure Connection...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <Dashboard user={user} />
      ) : (
        <div className="min-h-screen bg-app-bg flex items-center justify-center">
          <div className="text-center p-8 border border-white/10 rounded-2xl bg-white/5">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Flowva Rewards Hub
            </h1>
            <p className="text-text-secondary mb-6">
              Authenticated Session Required
            </p>
            <button 
              onClick={() => setShowSignInModal(true)}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
            >
              Sign In Manually
            </button>
          </div>
        </div>
      )}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' }
        }} 
      />
    </>
  );
}

export default App;