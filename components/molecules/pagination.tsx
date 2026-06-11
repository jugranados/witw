"use client";

type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({ page, totalPages, onPrev, onNext }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-4 py-2 rounded shadow bg-elements text-foreground disabled:opacity-40 hover:opacity-80 transition-opacity"
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="text-sm text-foreground">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="px-4 py-2 rounded shadow bg-elements text-foreground disabled:opacity-40 hover:opacity-80 transition-opacity"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
