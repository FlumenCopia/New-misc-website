import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  action,
  className = '',
}) => {
  return (
    <div className={`bg-white border border-amber-100/70 rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4.5 border-b border-amber-50 flex items-center justify-between bg-white">
          <div>
            {title && <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-[13px] text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
