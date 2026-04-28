import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { API } from "./utils/helpers";
import Topbar from "./components/Topbar";
import TweaksPanel from "./components/TweaksPanel";
import CustomerForm from "./components/CustomerForm";
import CustomerTable from "./components/CustomerTable";
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
      if (saved) return { ...defaults, ...JSON.parse(saved) };
    } catch {
      return defaults;
    }
    return defaults;
  });

  useEffect(() => {
    const { _modalOpen, ...toSave } = tweaks;
    localStorage.setItem("tweaks", JSON.stringify(toSave));
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

  useEffect(() => { setPage(1); }, [search]);

  const handleAdded = () => {
    fetchCustomers(search);
    addToast("Customer added");
  };

  const handleDeleted = () => {
    fetchCustomers(search);
    addToast("Customer deleted", "info");
  };

  const total = customers.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = useMemo(
    () => customers.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [customers, safePage]
  );
  const startIndex = (safePage - 1) * PAGE_SIZE;

  const themeClass = `theme-${tweaks.mode} accent-${tweaks.accent}`;
  const isCompact = tweaks.density === "compact";
  const layoutDir = tweaks.formPlacement === "top" ? "flex-col" : "flex-row";

  return (
    <div className={`${themeClass} min-h-screen bg-app text-text transition-colors duration-150 font-sans text-sm leading-normal antialiased`}>
      <Topbar
        search={search}
        onSearchChange={setSearch}
        onOpenTweaks={() => setTweaksOpen(true)}
      />

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
          <CustomerTable
            customers={paged}
            startIndex={startIndex}
            onDelete={handleDeleted}
            compact={isCompact}
            page={safePage}
            totalPages={totalPages}
            total={total}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
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
