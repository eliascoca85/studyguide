"use client";

export function ProgressBar({ 
  value = 0, 
  max = 100, 
  size = "md", 
  className = "", 
  showLabel = false,
  variant = "default",
  animated = false,
  stripe = false
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
    xl: "h-6",
  };

  const variants = {
    default: "bg-gradient-to-r from-indigo-500 to-purple-500",
    success: "bg-gradient-to-r from-emerald-500 to-green-500",
    warning: "bg-gradient-to-r from-amber-500 to-orange-500",
    danger: "bg-gradient-to-r from-red-500 to-rose-500",
    exp: "bg-gradient-to-r from-yellow-400 to-amber-500",
    coins: "bg-gradient-to-r from-yellow-300 to-yellow-500",
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || size === "xl") && (
        <div className="flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
          <span>Progreso</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`relative ${sizes[size]} bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${variants[variant]} ${animated ? "animate-pulse" : ""} ${stripe ? "bg-stripes" : ""}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}