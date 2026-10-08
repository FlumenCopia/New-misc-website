import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-[#1abc9c] hover:bg-[#16a085] text-white font-semibold shadow-sm focus-visible:outline-[#1abc9c] active:scale-[0.99] transition-all',
    secondary:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 font-medium shadow-xs active:scale-[0.99] transition-all',
    danger:
      'bg-[#ff5252] hover:bg-[#e04545] text-white font-medium shadow-xs focus-visible:outline-[#ff5252] active:scale-[0.99] transition-all',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 active:scale-[0.99] transition-all',
    outline:
      'bg-transparent border border-[#1abc9c] text-[#1abc9c] hover:bg-[#1abc9c]/10 font-medium active:scale-[0.99] transition-all',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[13px] rounded-lg font-medium',
    md: 'px-4 py-2 text-sm rounded-lg font-semibold',
    lg: 'px-5 py-2.5 text-base rounded-lg font-semibold',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};
