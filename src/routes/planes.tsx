import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/planes")({
  component: Planes,
  head: () => ({
    meta: [
      { title: "Planes — In The CLAB | Marketing Deportivo para Clubes" },
      { name: "description", content: "Planes de marketing deportivo a medida para clubes, academias y centros deportivos. Branding, redes sociales y audiovisual con In The CLAB." },
      { property: "og:title", content: "Planes — In The CLAB" },
      { property: "og:description", content: "Planes de marketing deportivo a medida de clubes, academias y centros deportivos." },
      { property: "og:url", content: "https://clabagency.com/planes" },
    ],
    links: [{ rel: "canonical", href: "https://clabagency.com/planes" }],
  }),
});

type Plan = { n: string; p: string; per: string; d: string; items: string[] };

export default function Planes() {
  const { t } = useI18n();
  const plans = t<Plan[]>("planes.list");

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-5 md:px-10">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => {
            const h = i === 1;
            return (
              <div
                key={p.n}
                className={`p-8 md:p-10 border flex flex-col ${h ? "bg-black text-white border-black scale-100 md:scale-105 shadow-2xl" : "border-black/15"}`}
              >
                {h && <span className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-70">{t<string>("planes.recommended")}</span>}
                <h3 className="text-sm uppercase tracking-widest font-bold opacity-70">{p.n}</h3>
                <div className="mt-6">
                  <span className="text-3xl md:text-4xl font-bold leading-tight">{p.p}</span>
                </div>
                <p className="mt-4 text-sm opacity-70 leading-relaxed">{p.d}</p>
                <ul className="mt-8 space-y-3 flex-1">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0"/> <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacto"
                  className={`mt-10 inline-flex items-center justify-center gap-2 px-6 py-4 text-sm uppercase tracking-widest font-semibold border ${h ? "bg-white text-black border-white hover:bg-white/90" : "border-black hover:bg-black hover:text-white"}`}
                >
                  {t<string>("planes.ctaBtn")} <ArrowRight size={14}/>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 md:py-28 px-5 md:px-10 border-t border-black/10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            {t<string>("planes.title1")} <span className="italic font-light">{t<string>("planes.title2")}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-black/60">
            {t<string>("planes.lead")}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
