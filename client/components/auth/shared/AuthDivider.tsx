"use client";

interface AuthDividerProps {
  text?: string;
}

export default function AuthDivider({
  text = "Or continue with",
}: AuthDividerProps) {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="h-px flex-1 bg-slate-200" />

      <span className="text-sm font-medium text-slate-500">
        {text}
      </span>

      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}