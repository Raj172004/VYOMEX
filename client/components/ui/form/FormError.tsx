"use client";

interface FormErrorProps {
  message?: string;
}

export default function FormError({
  message,
}: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
      <p className="text-sm font-medium text-red-600">
        {message}
      </p>
    </div>
  );
}