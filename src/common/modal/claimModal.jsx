//src/common/modal/claimModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, CloudUpload } from 'lucide-react';

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
    
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
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
        className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 id="modal-title" className="text-lg font-bold text-gray-900">
            Claim Your {points} Points
          </h2>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5">
          <div className="mb-5 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl">
            <p className="mb-3">
              Sign up for {toolName} (free, no payment needed), then fill the form below:
            </p>
            <div className="flex gap-2.5 items-start mb-2.5">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                1
              </span>
              <p>Enter your {toolName} sign-up email.</p>
            </div>
            <div className="flex gap-2.5 items-start mb-3">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
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
                required
                placeholder="user@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm"
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
                  required
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-required="true"
                  aria-label="Upload screenshot file"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-purple-400 transition-colors bg-gray-50">
                  <CloudUpload className="h-6 w-6 text-purple-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700">
                    {file ? file.name : 'Choose file'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full font-medium text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full font-medium text-sm bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-md active:scale-95"
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

export default ClaimModal;