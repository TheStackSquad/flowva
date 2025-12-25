// src/features/rewards/components/toolSpotlight.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Gift, UserPlus, X, CloudUpload } from 'lucide-react';
import { createPortal } from 'react-dom';

const ClaimModal = ({ isOpen, onClose, toolName, points }) => {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleTabKey = (e) => {
      if (!modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      if (firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (email && file) {
      onClose();
      setEmail('');
      setFile(null);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        aria-hidden="true"
      />

      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 id="modal-title" className="text-lg font-bold text-gray-900 truncate">
            Claim Your {points} Points
          </h2>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-5 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl">
            <p className="mb-3">
              Sign up for {toolName} (free, no payment needed), then fill the form below:
            </p>
            <div className="flex gap-2.5 items-start mb-2.5">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5" aria-hidden="true">
                1
              </span>
              <p>Enter your {toolName} sign-up email.</p>
            </div>
            <div className="flex gap-2.5 items-start mb-3">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5" aria-hidden="true">
                2
              </span>
              <p>Upload a screenshot of your {toolName} profile showing your email.</p>
            </div>
            <p className="text-gray-800 font-medium">
              After verification, you'll get {points} Flowva Points! 🎉 😊
            </p>
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <label htmlFor="email-input" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Email used on {toolName}
              </label>
              <input
                id="email-input"
                ref={firstInputRef}
                type="email"
                placeholder="user@example.com"
                className="w-full px-4 py-3 sm:py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="file-input" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Upload screenshot (mandatory)
              </label>
              <div className="relative">
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-required="true"
                  aria-label="Upload screenshot file"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-purple-400 transition-colors bg-gray-50">
                  <CloudUpload className="h-6 w-6 text-purple-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700 truncate max-w-full">
                    {file ? file.name : 'Choose file'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 sm:py-2 rounded-full font-medium text-sm text-gray-600 hover:bg-gray-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!email || !file}
              className="px-6 py-3 sm:py-2 rounded-full font-medium text-sm bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              Submit Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const ToolSpotlightCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  const handleSignUp = async () => {
    setIsSignUpLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const handleClaimPoints = () => {
    setIsClaimModalOpen(true);
  };

  const gridColors = [
    { bg: 'bg-purple-700' },
    { bg: 'bg-yellow-400' },
    { bg: 'bg-pink-500' },
    { bg: 'bg-gray-800' }
  ];

  return (
    <>
      <div 
        className={`rounded-2xl overflow-hidden transition-all duration-300 shadow-md ${
          isHovered ? '-translate-y-1 shadow-xl' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-400 p-5 sm:p-6 relative min-h-[180px]">
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 h-12 w-12 sm:h-16 sm:w-16 bg-blue-300 rounded-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5 sm:gap-1 p-1 sm:p-2">
              {gridColors.map((color, index) => (
                <div 
                  key={index}
                  className={`h-2 w-2 sm:h-3 sm:w-3 rounded-sm ${color.bg}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col pr-16 sm:pr-20">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 mt-8 sm:mt-6">
              Top Tool Spotlight
            </h2>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Reclaim
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6">
          <div className="flex gap-3 mb-5 sm:mb-6">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-semibold text-gray-900 mb-1.5 sm:mb-2 truncate">
                Automate and Optimize Your Schedule
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-4">
                Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <button 
              onClick={handleSignUp}
              disabled={isSignUpLoading}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 sm:px-5 py-3 sm:py-2.5 rounded-full font-medium text-sm hover:bg-purple-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Sign up for Reclaim"
              aria-busy={isSignUpLoading}
            >
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              {isSignUpLoading ? 'Loading...' : 'Sign up'}
            </button>

            <button 
              onClick={handleClaimPoints}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-3 py-3 sm:py-2 rounded-full font-medium text-sm hover:bg-purple-700 transition-colors shadow-md"
              aria-label="Claim 50 Flowva points"
            >
              <Gift className="h-4 w-4" aria-hidden="true" />
              Claim 50 pts
            </button>
          </div>
        </div>
      </div>

      <ClaimModal 
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        toolName="Reclaim"
        points={50}
      />
    </>
  );
};

export default React.memo(ToolSpotlightCard);