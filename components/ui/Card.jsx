"use client";

export function Card({ children, className = "", variant = "default", hover = false, padding = "md" }) {
  const variants = {
    default: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm",
    elevated: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-lg shadow-zinc-900/5 dark:shadow-black/20",
    outlined: "bg-transparent border-2 border-zinc-200 dark:border-zinc-700",
    gradient: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800",
    glass: "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 shadow-xl",
    premium: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 shadow-lg shadow-amber-500/10",
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
    xl: "p-9",
  };

  const hoverStyles = hover 
    ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-700" 
    : "";

  return (
    <div className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", title, subtitle, action }) {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`}>
      <div>
        {title && <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{title}</h3>}
        {subtitle && <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>}
        {children}
      </div>
      {action && <div className="flex-shrink-0 ml-4">{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={`flex items-center pt-4 border-t border-zinc-200 dark:border-zinc-700 mt-4 ${className}`}>
      {children}
    </div>
  );
}