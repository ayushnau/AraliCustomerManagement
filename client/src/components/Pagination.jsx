export default function Pagination({ page, totalPages, total, pageSize, onPageChange }) {
  const startIndex = (page - 1) * pageSize;

  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-border text-xs">
      <span className="font-mono text-text-3">length = {total}</span>
      <div className="flex items-center gap-2">
        <button
          className="px-2.5 py-1 rounded border border-border bg-transparent text-text-2 cursor-pointer text-xs font-sans transition-all duration-150 hover:bg-stripe disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="text-text-3">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-2.5 py-1 rounded border border-border bg-transparent text-text-2 cursor-pointer text-xs font-sans transition-all duration-150 hover:bg-stripe disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
      <span className="text-text-3">
        Showing {total === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, total)} of {total}
      </span>
    </div>
  );
}
