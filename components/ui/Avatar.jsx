"use client";

export function Avatar({ src, alt = "", size = "md", className = "", fallback }) {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl",
    "2xl": "w-28 h-28 text-3xl",
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = fallback || getInitials(alt);

  if (src) {
    return (
      <div className={`relative inline-block overflow-hidden rounded-2xl ring-2 ring-indigo-500/30 ${sizes[size]} ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold rounded-2xl ring-2 ring-indigo-500/30 ${sizes[size]} ${className}`}
      aria-label={alt}
    >
      {initials}
    </div>
  );
}