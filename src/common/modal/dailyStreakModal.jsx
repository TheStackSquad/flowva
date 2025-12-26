// src/common/modal/dailyClaimModal.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle } from 'lucide-react';

const DailyClaimedModal = ({ isOpen, onClose, points = 5 }) => {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleTabKey = (e) => {
      if (!modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

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
    
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="absolute inset-0 bg-black/60"
        aria-hidden="true"
      />
      
      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl max-w-sm w-full shadow-2xl p-8 text-center"
      >
        <button 
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </button>
        
        <div className="flex flex-col items-center">
          <CheckCircle className="h-20 w-20 text-green-500" aria-hidden="true" />
          <h3 className="text-3xl font-bold text-gray-900 mt-4">
            Level Up! ✨🎉
          </h3>
          <p className="text-4xl font-extrabold text-purple-600 mt-2">
            +{points} Points
          </p>
          <p className="text-gray-700 mt-4 max-w-[200px]">
            You've claimed your daily points! Come back tomorrow for more!
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DailyClaimedModal;