interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="text-red-600 font-semibold">
        {message || "Something went wrong."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
