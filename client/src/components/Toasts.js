export default function Toasts({ items }) {
  if (!items.length) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className="py-2.5 px-5 rounded-md bg-toast-bg text-toast-text text-[13px] font-medium shadow-lg animate-slide-up whitespace-nowrap"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
