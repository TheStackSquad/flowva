//src/components/ui/avatar.jsx

import clsx from 'clsx';

export default function Avatar({ 
  src, 
  alt, 
  username,
  size = 'md',
  className 
}) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  // Get initials from username
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate color based on username
  const getColorClass = (name) => {
    if (!name) return 'bg-gray-400';
    const colors = [
      'bg-primary-500',
      'bg-accent-pink',
      'bg-accent-blue',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-blue-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || username}
        className={clsx(
          'rounded-full object-cover',
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center text-white font-semibold',
        sizes[size],
        getColorClass(username),
        className
      )}
    >
      {getInitials(username || alt)}
    </div>
  );
}