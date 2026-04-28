import { SearchIcon, BrandIcon, GearIcon } from "./Icons";

export default function Topbar({ search, onSearchChange, onOpenTweaks }) {
  return (
    <header className="sticky top-0 z-50 flex items-center gap-4 h-14 px-6 bg-topbar-bg border-b border-topbar-border">
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="text-accent flex" aria-hidden="true">
          <BrandIcon />
        </div>
        <div>
          <div className="font-bold text-[15px] leading-tight text-text">Admin</div>
          <div className="text-[11px] text-text-3 uppercase tracking-wide">Customer Management</div>
        </div>
      </div>

      <div className="flex-1 max-w-[420px] flex items-center gap-2 px-3 h-9 bg-input-bg border border-input-border rounded-full text-text-3 transition-colors duration-150 focus-within:border-accent focus-within:text-text">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search name, email, phone…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 border-none outline-none bg-transparent text-[13px] text-text font-sans placeholder:text-text-3"
        />
      </div>

      <div className="ml-auto flex items-center gap-3 shrink-0">
        <button
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-transparent rounded-md bg-transparent text-text-3 cursor-pointer text-xs font-sans transition-all duration-150 hover:text-text-2 hover:bg-stripe"
          aria-label="Open tweaks"
          onClick={onOpenTweaks}
        >
          <GearIcon />
        </button>
      </div>
    </header>
  );
}
