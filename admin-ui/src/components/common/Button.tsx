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
      'bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold shadow-sm focus-visible:outline-amber-500',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus-visible:outline-rose-600',
    ghost:
      'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white',
    outline:
      'bg-transparent border border-amber-500/50 text-amber-400 hover:bg-amber-500/10',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs rounded-md',
    md: 'px-3.5 py-2 text-sm rounded-lg',
    lg: 'px-4.5 py-2.5 text-base rounded-lg',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
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
