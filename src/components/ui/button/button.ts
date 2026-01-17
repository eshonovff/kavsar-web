import * as React from "react";


export const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    m: 'px-4 py-2 text-sm',
    sm: 'px-4 py-3 text-sm',
    md: 'px-5 py-3.5 text-sm',
} as const;


export const variantClasses = {
    primary: 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300',
    outline:
        'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300',
    secondary:
        'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    destructive: 'bg-red-500 dark:bg-red-500/50 text-white shadow-theme-xs hover:bg-red-600 disabled:bg-red-300',
    success: 'bg-green-500 dark:bg-green-600 text-white shadow-theme-xs hover:bg-green-600 disabled:bg-green-300',
    warning:
        'bg-yellow-400/80 text-yellow-50 shadow-theme-xs hover:bg-yellow-500 disabled:bg-yellow-200 dark:bg-yellow-500 dark:text-yellow-50 dark:hover:bg-yellow-400',
    info: 'bg-blue-400 text-white shadow-theme-xs hover:bg-blue-500 disabled:bg-blue-200 dark:bg-blue-500 dark:text-blue-50 dark:hover:bg-blue-400',
    ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100 disabled:text-gray-400 dark:text-gray-300 dark:hover:bg-gray-800',
    link:
        'bg-transparent text-brand-900 font-normal transition-transform duration-200 hover:scale-[1.01] dark:text-brand-400 dark:hover:text-brand-300',
    subtle:
        'bg-gray-50 text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
    dashed:
        'border border-dashed border-gray-400 text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800',
    elevated:
        'bg-white text-gray-900 shadow-md hover:shadow-lg disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100',
    edit: 'bg-indigo-500 text-white shadow-theme-xs hover:bg-indigo-600 disabled:bg-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-400',
    discount:
        'bg-yellow-400 text-gray-900 font-semibold shadow-theme-xs hover:bg-yellow-500 active:scale-[0.98] disabled:bg-yellow-200 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400',
    sms: 'bg-purple-500 text-white shadow-theme-xs hover:bg-purple-600 disabled:bg-purple-300 dark:bg-purple-600 dark:hover:bg-purple-500',
    notification:
        'bg-cyan-500 text-white shadow-theme-xs hover:bg-cyan-600 disabled:bg-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-500',
    message:
        'bg-teal-500 text-white shadow-theme-xs hover:bg-teal-600 disabled:bg-teal-300 dark:bg-teal-600 dark:hover:bg-teal-500',
    chat: 'bg-pink-500 text-white shadow-theme-xs hover:bg-pink-600 disabled:bg-pink-300 dark:bg-pink-600 dark:hover:bg-pink-500',
    send: 'bg-emerald-500 text-white shadow-theme-xs hover:bg-emerald-600 disabled:bg-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-500',
    inbox:
        'bg-violet-500 text-white shadow-theme-xs hover:bg-violet-600 disabled:bg-violet-300 dark:bg-violet-600 dark:hover:bg-violet-500',
    trash:
        'bg-red-50 text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-100 active:scale-[0.98] dark:bg-red-900/40 dark:text-red-300 dark:ring-red-700 dark:hover:bg-red-900',
} as const;

export type ButtonProps = {
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    size?: keyof typeof sizeClasses;
    variant?: keyof typeof variantClasses;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
    isPending?: boolean;
}