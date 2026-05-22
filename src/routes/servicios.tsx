import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/servicios")({
  component: Servicios,
  head: () => ({
    meta: [
      { title: "Servicios — In The CLAB" },
      { name: "description", content: "Branding, redes sociales, optimización digital y audiovisual para clubes y academias deportivas." },
    ],
  }),
});

type Item = { t: string; d: string };
type Service = { t: string; d: string; items: Item[] };

export default function Servicios() {
  const { t } = useI18n();
  const services = t<Service[]>("servicios.services");
  // open = "serviceIdx-itemIdx" or null. Only one open at a time across whole page.
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="bg-white text-black">
      <Navbar />

      <section className="pt-40 pb-20 md:pt-52 md:pb-28 px-5 md:px-10 border-b border-black/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-6">{t<string>("servicios.label")}</p>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            {t<string>("servicios.title1")} <span className="italic font-light">{t<string>("servicios.title2")}</span>
          </h1>
        </div>
      </section>

      {services.map((s, sIdx) => {
        const light = sIdx % 2 === 0;
        return (
          <section
            key={s.t}
            className={`px-5 md:px-10 py-24 md:py-32 ${light ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-10">
              <div className="md:col-span-5">
                <span className={`text-xs font-mono ${light ? "text-black/40" : "text-white/40"}`}>
                  {String(sIdx + 1).padStart(2, "0")} / {t<string>("servicios.ofText")}
                </span>
                <h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none">{s.t}</h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-lg md:text-xl leading-relaxed opacity-80">{s.d}</p>
                <ul className="mt-10 flex flex-col">
                  {s.items.map((it, iIdx) => {
                    const key = `${sIdx}-${iIdx}`;
                    const isOpen = open === key;
                    return (
                      <motion.li
                        key={it.t}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`border-b ${light ? "border-black/10" : "border-white/10"}`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between gap-4 py-4 text-left"
                        >
                          <span className="flex items-center gap-3">
                            <ArrowRight size={14} />
                            <span className="text-sm uppercase tracking-wide">{it.t}</span>
                          </span>
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="panel"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className={`pb-5 pl-7 pr-2 text-sm leading-relaxed ${light ? "text-black/70" : "text-white/70"}`}>
                                {it.d}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-black text-white py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">{t<string>("servicios.ctaTitle")}</h2>
          <Link to="/contacto" className="mt-10 inline-flex items-center gap-3 bg-white text-black px-8 py-5 text-sm uppercase tracking-widest font-semibold hover:bg-white/90">
            {t<string>("servicios.ctaBtn")} <ArrowRight size={16}/>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
