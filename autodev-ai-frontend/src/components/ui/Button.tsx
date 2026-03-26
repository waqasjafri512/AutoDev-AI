import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200',
    outline: 'bg-transparent border-2 border-gray-200 hover:border-brand-primary text-gray-600 hover:text-brand-primary shadow-sm hover:shadow-md',
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
