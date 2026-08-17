"use client";
import React, { useState } from "react";

export function Tabs({ defaultValue, className = "", children, onChange, variant = "default" }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (tabValue) => {
    setValue(tabValue);
    onChange?.(tabValue);
  };

  const variants = {
    default: "bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl",
    underline: "border-b border-zinc-200 dark:border-zinc-700",
    pills: "bg-transparent",
    segment: "bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl gap-1",
  };

  return (
    <div className={className}>
      <div 
        className={`flex ${variants[variant]} ${variant === "underline" ? "gap-1" : ""}`}
        role="tablist"
      >
        {React.Children.map(children, (child) => {
          if (child.type === TabList) {
            return React.cloneElement(child, { value, onChange: handleChange, variant });
          }
          return child;
        })}
      </div>
      <div className="mt-4">
        {React.Children.map(children, (child) => {
          if (child.type === TabPanel) {
            return React.cloneElement(child, { value, selectedValue: value });
          }
          return child;
        })}
      </div>
    </div>
  );
}

export function TabList({ children, value, onChange, variant, className = "" }) {
  return (
    <div className={`flex ${className}`} role="tablist">
      {React.Children.map(children, (child) => {
        if (child.type === TabTrigger) {
          return React.cloneElement(child, { 
            value, 
            onChange, 
            variant,
            isActive: child.props.value === value 
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabTrigger({ value, children, onChange, variant, isActive, className = "", disabled = false }) {
  const variants = {
    default: isActive 
      ? "bg-white dark:bg-zinc-900 shadow-sm text-indigo-600 dark:text-indigo-400" 
      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
    underline: isActive 
      ? "border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400" 
      : "border-b-2 border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
    pills: isActive 
      ? "bg-indigo-600 text-white shadow-sm" 
      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800",
    segment: isActive 
      ? "bg-white dark:bg-zinc-900 shadow-sm text-indigo-600 dark:text-indigo-400" 
      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
  };

  const baseStyles = "px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      disabled={disabled}
      onClick={() => !disabled && onChange(value)}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function TabPanel({ value, children, selectedValue, className = "" }) {
  if (value !== selectedValue) return null;
  
  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={`animate-fade-in ${className}`}
    >
      {children}
    </div>
  );
}