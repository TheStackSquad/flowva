// src/components/ui/buttons.jsx

export const PrimaryButton = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  type = "button" 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2";
  
  const stateStyles = disabled 
    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none" 
    : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95 shadow-md shadow-purple-100";

  return (
    <button
      type={type}
      className={`${baseStyles} ${stateStyles} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};


export const TabButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative py-3 px-1 font-medium text-sm transition-colors duration-150 focus:outline-none
        ${isActive 
          ? 'text-purple-700 bg-purple-50' 
          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 focus:text-purple-600 focus:bg-purple-50'
        }
      `}
    >
      {label}
      
      {/* Bottom border - animated from 0 to 100% width */}
      <span 
        className={`
          absolute bottom-0 left-0 h-0.5 bg-purple-700 transition-all duration-300
          ${isActive ? 'w-full' : 'w-0'}
        `}
      />
    </button>
  );
};

// export const TabButton = ({ label, isActive, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         whitespace-nowrap pb-4 px-1 text-sm font-medium transition-colors duration-300 relative
//         ${
//           isActive
//             ? 'text-primary-600'
//             : 'text-text-secondary hover:text-text-primary'
//         }
//       `}
//       aria-current={isActive ? 'page' : undefined}
//     >
//       {label}
//       {/* Animated Underline */}
//       <span
//         className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ease-in-out ${
//           isActive ? 'w-full' : 'w-0'
//         }`}
//       />
//     </button>
//   );
// };