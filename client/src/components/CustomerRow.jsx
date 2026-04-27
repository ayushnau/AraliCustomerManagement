import { useState } from "react";
import { API, initials, fmtDate } from "../utils/helpers";
import { TrashIcon } from "./Icons";
import ConfirmModal from "./ConfirmModal";

export default function CustomerRow({ customer, index, onDelete, compact }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    await fetch(`${API}/${customer.id}`, { method: "DELETE" });
    setShowConfirm(false);
    onDelete();
  };

  const rowH = compact ? "h-[42px]" : "h-14";

  return (
    <>
      <tr className={`${rowH} transition-colors duration-150 hover:bg-hover-row border-b border-border last:border-b-0`}>
        <td className="pl-5 pr-4 whitespace-nowrap text-[13.5px]">
          <div className="flex items-center gap-3">
            <div className="w-[34px] h-[34px] rounded-full bg-accent-light text-accent flex items-center justify-center text-xs font-bold shrink-0" aria-hidden="true">
              {initials(customer.name)}
            </div>
            <div className="leading-tight">
              <div className="font-medium text-text">{customer.name}</div>
              <div className="font-mono text-[11px] text-text-3">#{String(index).padStart(3, "0")}</div>
            </div>
          </div>
        </td>
        <td className="px-4 whitespace-nowrap text-[13.5px]">
          <a href={`mailto:${customer.email}`} className="text-accent no-underline hover:underline">
            {customer.email}
          </a>
        </td>
        <td className="px-4 whitespace-nowrap font-mono text-[13px] text-text-2">{customer.phone}</td>
        <td className="px-4 whitespace-nowrap text-[12.5px] text-text-3">{fmtDate(customer.createdAt)}</td>
        <td className="pr-5 pl-4 whitespace-nowrap text-right">
          <button
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-transparent rounded-md bg-transparent text-text-3 cursor-pointer text-xs font-sans transition-all duration-150 hover:text-danger hover:bg-danger-light"
            aria-label={`Delete ${customer.name}`}
            onClick={() => setShowConfirm(true)}
          >
            <TrashIcon />
            <span>Delete</span>
          </button>
        </td>
      </tr>
      {showConfirm && (
        <ConfirmModal
          name={customer.name}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
