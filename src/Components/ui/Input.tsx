import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'search';
}

export function Input({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  variant = 'default',
  className = '',
  ...props
}: InputProps) {
  const baseClasses = 'block w-full border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200';
  
  const variantClasses = {
    default: 'px-3 py-2 text-sm',
    search: 'py-3 text-sm'
  };
  
  const paddingClasses = Icon ? (
    iconPosition === 'left' ? 'pl-10 pr-3' : 'pl-3 pr-10'
  ) : 'px-3';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses} ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}