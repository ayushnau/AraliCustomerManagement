import { CloseIcon } from "./Icons";

export default function TweaksPanel({ tweaks, setTweaks, open, onClose }) {
  if (!open) return null;

  const opt = (key, value, label) => (
    <button
      className={`flex-1 py-2 px-1 border-none text-[13px] font-sans cursor-pointer transition-all duration-150 ${
        tweaks[key] === value
          ? "bg-surface text-text font-semibold shadow-sm"
          : "bg-transparent text-text-2"
      }`}
      onClick={() => setTweaks((t) => ({ ...t, [key]: value }))}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[500] bg-black/20 flex justify-end animate-fade-in" onClick={onClose}>
      <aside
        className="w-[340px] h-full bg-surface border-l border-border py-7 px-6 overflow-y-auto animate-slide-left shadow-[-8px_0_30px_rgba(0,0,0,0.08)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-7">
          <h3 className="text-lg font-bold text-text">Tweaks</h3>
          <button
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-transparent rounded-md bg-transparent text-text-3 cursor-pointer text-xs font-sans transition-all duration-150 hover:text-text-2 hover:bg-stripe"
            onClick={onClose}
            aria-label="Close tweaks"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium text-text mb-2.5">Mode</div>
          <div className="flex border border-border rounded-md overflow-hidden">
            {opt("mode", "light", "Light")}
            <div className="w-px bg-border" />
            {opt("mode", "dark", "Dark")}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium text-text mb-2.5">Accent</div>
          <div className="flex border border-border rounded-md overflow-hidden">
            {opt("accent", "indigo", "Indigo")}
            <div className="w-px bg-border" />
            {opt("accent", "emerald", "Emerald")}
            <div className="w-px bg-border" />
            {opt("accent", "slate", "Slate")}
            <div className="w-px bg-border" />
            {opt("accent", "amber", "Amber")}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium text-text mb-2.5">Form placement</div>
          <div className="flex border border-border rounded-md overflow-hidden">
            {opt("formPlacement", "side", "Side")}
            <div className="w-px bg-border" />
            {opt("formPlacement", "top", "Top")}
            <div className="w-px bg-border" />
            {opt("formPlacement", "modal", "Modal")}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium text-text mb-2.5">Density</div>
          <div className="flex border border-border rounded-md overflow-hidden">
            {opt("density", "comfortable", "Comfortable")}
            <div className="w-px bg-border" />
            {opt("density", "compact", "Compact")}
          </div>
        </div>
      </aside>
    </div>
  );
}
