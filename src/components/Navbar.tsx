import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/planes", label: "Planes" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Navbar({ invert = false }: { invert?: boolean }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const textColor = invert ? "text-white" : "text-black";
  const borderColor = invert ? "border-white/10" : "border-black/10";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 border-b ${borderColor} backdrop-blur-md ${invert ? "bg-black/60" : "bg-white/70"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <Logo invert={invert} />
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm uppercase tracking-widest font-medium ${textColor} hover:opacity-60 transition-opacity`}
                activeProps={{ className: `text-sm uppercase tracking-widest font-bold ${textColor} underline underline-offset-8` }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            className={`md:hidden ${textColor}`}
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 md:px-10 border-b border-white/10">
            <Logo invert />
            <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
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
          </nav>
        </div>
      )}
    </>
  );
}
