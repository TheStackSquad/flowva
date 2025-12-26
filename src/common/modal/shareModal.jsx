// src/common/modal/shareModal.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Layers } from 'lucide-react';

const ShareModal = ({ isOpen, onClose }) => {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
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
      aria-labelledby="share-modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/60"
        aria-hidden="true"
      />
      
      <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full">
        <button 
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        
        <h3 
          id="share-modal-title"
          className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6"
        >
          Share Your Stack
        </h3>
        
        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
          <Layers className="w-10 h-10 text-purple-600" aria-hidden="true" />
        </div>
        
        <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed px-4">
          You have no stack created yet. Go to Tech Stack to create one.
        </p>
      </div>
    </div>,
    document.body
  );
};

export default React.memo(ShareModal);