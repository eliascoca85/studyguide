"use client";
import { forwardRef } from "react";

export const Input = forwardRef(({ 
  label, 
  error, 
  hint, 
  className = "", 
  type = "text", 
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const id = props.id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 ${
            iconPosition === "left" ? "pl-12" : ""
          } ${
            iconPosition === "right" ? "pr-12" : ""
          } ${
            error 
              ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500" 
              : "border-zinc-300 dark:border-zinc-600 focus:ring-indigo-500 focus:border-indigo-500"
          } focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-zinc-100 dark:disabled:bg-zinc-900/50 disabled:cursor-not-allowed ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none">
            {icon}
          </div>
        )}
        {props.type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            aria-label="Mostrar/ocultar contraseña"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";