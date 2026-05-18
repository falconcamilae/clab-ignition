import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <Logo invert />
            <p className="mt-6 text-sm text-white/60 max-w-xs leading-relaxed">
              La pasión ya está. Nosotros la hacemos visible.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">Navegación</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/servicios" className="hover:opacity-60">Servicios</Link></li>
              <li><Link to="/planes" className="hover:opacity-60">Planes</Link></li>
              <li><Link to="/nosotros" className="hover:opacity-60">Nosotros</Link></li>
              <li><Link to="/contacto" className="hover:opacity-60">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail size={14}/> [hola@intheclab.com]</li>
              <li className="flex items-center gap-2"><Instagram size={14}/> [@intheclab]</li>
              <li className="text-white/60">Málaga, España</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-white/40 gap-2">
          <span>© {new Date().getFullYear()} In The Clab. Todos los derechos reservados.</span>
          <span>[intheclab.com]</span>
        </div>
      </div>
    </footer>
  );
}
