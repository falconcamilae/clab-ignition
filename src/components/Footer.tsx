import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src="/media/logo-clab.png" alt="In The Clab" className="h-8 md:h-10 w-auto" />
            <p className="mt-6 text-sm text-white/60 max-w-xs leading-relaxed">
              {t<string>("footer.tagline")}
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">{t<string>("footer.nav")}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/servicios" className="hover:opacity-60">{t<string>("nav.servicios")}</Link></li>
              <li><Link to="/planes" className="hover:opacity-60">{t<string>("nav.planes")}</Link></li>
              <li><Link to="/nosotros" className="hover:opacity-60">{t<string>("nav.nosotros")}</Link></li>
              <li><Link to="/contacto" className="hover:opacity-60">{t<string>("nav.contacto")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">{t<string>("footer.contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail size={14}/><span>contacto@intheclab.com</span></li>
              <li className="flex items-center gap-2"><Instagram size={14}/><span>@wearclab</span></li>
              <li className="text-white/60">{t<string>("contacto.locationVal")}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-white/40 gap-2">
          <span>© {new Date().getFullYear()} In The Clab. {t<string>("footer.rights")}</span>
          <span>[intheclab.com]</span>
        </div>
      </div>
    </footer>
  );
}
