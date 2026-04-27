import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { API } from "./utils/helpers";
import { SearchIcon, BrandIcon, GearIcon } from "./components/Icons";
import TweaksPanel from "./components/TweaksPanel";
import CustomerForm from "./components/CustomerForm";
import CustomerRow from "./components/CustomerRow";
import Toasts from "./components/Toasts";
import "./App.css";

const PAGE_SIZE = 10;

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [toasts, setToasts] = useState([]);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaks, setTweaks] = useState(() => {
    const defaults = { mode: "light", accent: "indigo", formPlacement: "side", density: "comfortable" };
    try {
      const saved = localStorage.getItem("tweaks");
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch { return defaults; }
  });

  useEffect(() => {
    localStorage.setItem("tweaks", JSON.stringify(tweaks));
  }, [tweaks]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  const fetchCustomers = useCallback(async (query = "") => {
    const url = query ? `${API}?q=${encodeURIComponent(query)}` : API;
    const res = await fetch(url);
    const data = await res.json();
    setCustomers(data);
  }, []);

  const debounceRef = useRef(null);
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchCustomers(search), 300);
    return () => clearTimeout(debounceRef.current);
  }, [search, fetchCustomers]);

  const handleAdded = () => {
    fetchCustomers(search);
    addToast("Customer added");
  };

  const handleDeleted = () => {
    fetchCustomers(search);
    addToast("Customer deleted", "info");
  };

  // Reset to page 1 on search
  useEffect(() => { setPage(1); }, [search]);

  const total = customers.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safeePage = Math.min(page, totalPages);
  const paged = useMemo(
    () => customers.slice((safeePage - 1) * PAGE_SIZE, safeePage * PAGE_SIZE),
    [customers, safeePage]
  );
  const startIndex = (safeePage - 1) * PAGE_SIZE;

  const themeClass = `theme-${tweaks.mode} accent-${tweaks.accent}`;
  const isCompact = tweaks.density === "compact";
  const layoutDir = tweaks.formPlacement === "top" ? "flex-col" : "flex-row";

  return (
    <div className={`${themeClass} min-h-screen bg-app text-text transition-colors duration-150 font-sans text-sm leading-normal antialiased`}>
      {/* ── Topbar ── */}
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
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-none outline-none bg-transparent text-[13px] text-text font-sans placeholder:text-text-3"
          />
        </div>

        <div className="ml-auto flex items-center gap-3 shrink-0">
          <button
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-transparent rounded-md bg-transparent text-text-3 cursor-pointer text-xs font-sans transition-all duration-150 hover:text-text-2 hover:bg-stripe"
            aria-label="Open tweaks"
            onClick={() => setTweaksOpen(true)}
          >
            <GearIcon />
          </button>
        </div>
      </header>

      {/* ── Main layout ── */}
      <main className={`flex ${layoutDir} p-6 gap-6 min-h-[calc(100vh-3.5rem)] max-md:flex-col`}>
        {tweaks.formPlacement === "modal" ? (
          <>
            <button
              className="fixed bottom-6 right-6 z-50 h-11 px-5 rounded-full shadow-lg bg-accent text-accent-text font-medium text-sm border-none cursor-pointer font-sans inline-flex items-center justify-center transition-colors duration-150 hover:bg-accent-hover active:scale-[0.98]"
              onClick={() => setTweaks((t) => ({ ...t, _modalOpen: !t._modalOpen }))}
            >
              + Add customer
            </button>
            {tweaks._modalOpen && (
              <div className="fixed inset-0 z-[200] bg-black/35 flex items-center justify-center animate-fade-in" onClick={() => setTweaks((t) => ({ ...t, _modalOpen: false }))}>
                <aside className="w-[380px] animate-slide-up" onClick={(e) => e.stopPropagation()}>
                  <CustomerForm onAdded={() => { handleAdded(); setTweaks((t) => ({ ...t, _modalOpen: false })); }} />
                </aside>
              </div>
            )}
          </>
        ) : (
          <aside className={`${isCompact ? "w-[270px]" : "w-[300px]"} shrink-0 max-md:w-full`}>
            <CustomerForm onAdded={handleAdded} />
          </aside>
        )}

        <section className="flex-1 min-w-0">
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
                  {paged.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 px-4 text-text-3 text-sm">
                        No customers yet — add one using the form.
                      </td>
                    </tr>
                  ) : (
                    paged.map((c, i) => (
                      <CustomerRow
                        key={c.id}
                        customer={c}
                        index={startIndex + i + 1}
                        onDelete={handleDeleted}
                        compact={isCompact}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-border text-xs">
              <span className="font-mono text-text-3">length = {total}</span>
              <div className="flex items-center gap-2">
                <button
                  className="px-2.5 py-1 rounded border border-border bg-transparent text-text-2 cursor-pointer text-xs font-sans transition-all duration-150 hover:bg-stripe disabled:opacity-30 disabled:cursor-not-allowed"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={safeePage <= 1}
                >
                  Prev
                </button>
                <span className="text-text-3">
                  Page {safeePage} of {totalPages}
                </span>
                <button
                  className="px-2.5 py-1 rounded border border-border bg-transparent text-text-2 cursor-pointer text-xs font-sans transition-all duration-150 hover:bg-stripe disabled:opacity-30 disabled:cursor-not-allowed"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={safeePage >= totalPages}
                >
                  Next
                </button>
              </div>
              <span className="text-text-3">
                Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, total)} of {total}
              </span>
            </div>
          </div>
        </section>
      </main>

      <Toasts items={toasts} />

      <TweaksPanel
        tweaks={tweaks}
        setTweaks={setTweaks}
        open={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
      />
    </div>
  );
}
