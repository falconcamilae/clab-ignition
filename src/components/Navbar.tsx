import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Globe } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { LANGS, type Lang } from "@/i18n/translations";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: t<string>("nav.inicio") },
    { to: "/servicios", label: t<string>("nav.servicios") },
    { to: "/planes", label: t<string>("nav.planes") },
    { to: "/nosotros", label: t<string>("nav.nosotros") },
    { to: "/contacto", label: t<string>("nav.contacto") },
  ] as const;

  const LangSwitcher = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="relative">
      <button
        onClick={() => setLangOpen((v) => !v)}
        className={`flex items-center gap-2 ${mobile ? "text-base" : "text-xs"} uppercase tracking-widest font-medium text-white hover:opacity-60`}
        aria-label="Language"
      >
        <Globe size={mobile ? 18 : 14} /> {lang.toUpperCase()}
      </button>
      {langOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-black/10 min-w-[120px] z-50 shadow-lg">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as Lang);
                setLangOpen(false);
              }}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors ${lang === l.code ? "font-bold" : ""}`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <Link to="/" aria-label="In The Clab" className="flex items-center">
            <img src="/media/logo-clab.png" alt="In The Clab" className="h-8 md:h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm uppercase tracking-widest font-medium text-white hover:opacity-60 transition-opacity"
                activeProps={{ className: "text-sm uppercase tracking-widest font-bold text-white underline underline-offset-8" }}
              >
                {l.label}
              </Link>
            ))}
            <LangSwitcher />
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            <LangSwitcher mobile />
            <button
              className="text-white"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 md:px-10 border-b border-white/10">
            <Link to="/" aria-label="In The Clab" className="flex items-center">
              <img src="/media/logo-clab.png" alt="In The Clab" className="h-8 md:h-10 w-auto" />
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-3xl font-bold uppercase tracking-wider hover:opacity-60"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-6 flex gap-4">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as Lang)}
                  className={`flex items-center gap-2 text-sm uppercase tracking-widest px-3 py-1 border ${lang === l.code ? "bg-white text-black border-white" : "border-white/40 hover:bg-white hover:text-black"}`}
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
