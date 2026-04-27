export default function ConfirmModal({ name, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[200] bg-black/35 flex items-center justify-center animate-fade-in" onClick={onCancel}>
      <div
        className="bg-surface border border-border rounded-[10px] p-6 w-[380px] max-w-[90vw] shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-text mb-2">Delete customer</h3>
        <p className="text-sm text-text-2 leading-normal mb-5">
          Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <button
            className="h-10 px-5 bg-kbd-bg text-text border border-border rounded-md text-sm font-medium cursor-pointer font-sans transition-colors duration-150 hover:bg-border inline-flex items-center justify-center active:scale-[0.98]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="h-10 px-5 bg-danger text-white border-none rounded-md text-sm font-medium cursor-pointer font-sans transition-colors duration-150 hover:bg-red-800 inline-flex items-center justify-center active:scale-[0.98]"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
