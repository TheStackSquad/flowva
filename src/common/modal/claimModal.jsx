//src/common/modal/claimModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, CloudUpload } from 'lucide-react';

const ClaimModal = ({ isOpen, onClose, toolName, points = 25 }) => {
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
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative bg-white rounded-lg w-full max-w-[520px] shadow-xl p-6"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 id="modal-title" className="text-2xl font-bold text-black">
            Claim Your {points} Points
          </h2>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <p className="text-[15px] text-gray-600 leading-relaxed mb-3">
            Sign up for {toolName || 'Reclaim'} (free, no payment needed), then fill the form below:
          </p>
          <div className="space-y-2 mb-3">
            <div className="flex items-start text-[15px] text-gray-600">
              <span className="mr-2 flex-shrink-0">1️⃣</span>
              <span>Enter your {toolName || 'Reclaim'} sign-up email.</span>
            </div>
            <div className="flex items-start text-[15px] text-gray-600">
              <span className="mr-2 flex-shrink-0">2️⃣</span>
              <span>Upload a screenshot of your {toolName || 'Reclaim'} profile showing your email.</span>
            </div>
          </div>
          <p className="text-[15px] text-gray-600">
            After verification, you'll get {points} Flowva Points! 🎉 😊
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-[15px] font-semibold text-black mb-2"
            >
              Email used on {toolName || 'Reclaim'}
            </label>
            <input
              ref={firstInputRef}
              id="email"
              type="email"
              required
              placeholder="user@example.com"
              className="w-full h-[44px] px-3 text-[15px] border border-gray-300 rounded-md outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
            />
          </div>

          {/* File Upload */}
          <div>
            <label 
              htmlFor="file" 
              className="block text-[15px] font-semibold text-black mb-2"
            >
              Upload screenshot (mandatory)
            </label>
            <label 
              htmlFor="file"
              className="flex flex-col items-center justify-center w-full h-[110px] border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col items-center justify-center">
                <CloudUpload className="h-8 w-8 text-gray-500 mb-2" />
                <span className="text-[15px] text-gray-700 font-medium">
                  {file ? file.name : 'Choose file'}
                </span>
              </div>
              <input
                id="file"
                type="file"
                required
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                aria-required="true"
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-[15px] font-medium text-black bg-white border-0 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-[15px] font-medium text-white bg-[#9B00FF] rounded-md hover:bg-[#8500E0] transition-colors"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ClaimModal;