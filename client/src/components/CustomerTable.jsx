import CustomerRow from "./CustomerRow";
import Pagination from "./Pagination";

export default function CustomerTable({ customers, startIndex, onDelete, compact, page, totalPages, total, pageSize, onPageChange }) {
  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
      {/* Table header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-semibold text-text">Customers</h2>
          <span className="inline-flex items-center justify-center min-w-[24px] h-[22px] px-2 rounded-xl bg-accent-light text-accent text-xs font-semibold font-mono">
            {total}
          </span>
        </div>
        <div />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-stripe">
              <th className="pl-5 pr-4 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-wide text-text-3 whitespace-nowrap border-b border-border">Name</th>
              <th className="px-4 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-wide text-text-3 whitespace-nowrap border-b border-border">Email</th>
              <th className="px-4 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-wide text-text-3 whitespace-nowrap border-b border-border">Phone</th>
              <th className="px-4 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-wide text-text-3 whitespace-nowrap border-b border-border w-[90px]">Added</th>
              <th className="px-4 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-wide text-text-3 whitespace-nowrap border-b border-border w-[100px]" />
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 px-4 text-text-3 text-sm">
                  No customers yet — add one using the form.
                </td>
              </tr>
            ) : (
              customers.map((c, i) => (
                <CustomerRow
                  key={c.id}
                  customer={c}
                  index={startIndex + i + 1}
                  onDelete={onDelete}
                  compact={compact}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
