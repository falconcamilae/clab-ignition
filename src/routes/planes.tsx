import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/planes")({
  component: Planes,
  head: () => ({
    meta: [
      { title: "Planes — In The Clab" },
      { name: "description", content: "Planes de marketing deportivo a la medida de clubes, academias y centros deportivos." },
    ],
  }),
});

const plans = [
  {
    n: "Básico",
    p: "120€",
    per: "/mes",
    d: "Para clubes y academias que empiezan a tomarse en serio su presencia digital.",
    items: [
      "12 publicaciones al mes",
      "Plantillas de marca",
      "Calendario editorial",
      "Soporte por email",
    ],
    h: false,
  },
  {
    n: "Medio",
    p: "250€",
    per: "/mes",
    d: "El plan más popular. Contenido constante, cobertura y crecimiento real.",
    items: [
      "20 publicaciones al mes",
      "2 sesiones de fotografía",
      "Cobertura de 2 partidos",
      "Reels y stories editados",
      "Reporting mensual",
      "Estrategia trimestral",
    ],
    h: true,
  },
  {
    n: "Premium",
    p: "A medida",
    per: "",
    d: "Para clubes con ambición. Equipo dedicado, audiovisual avanzado y estrategia 360.",
    items: [
      "Todo lo del plan Medio",
      "Mini-documentales",
      "Presentación de jugadores",
      "Branding y rediseño",
      "Web institucional",
      "Equipo dedicado",
    ],
    h: false,
  },
];

export default function Planes() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      <section className="pt-40 pb-16 md:pt-52 md:pb-20 px-5 md:px-10 border-b border-black/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-6">Planes</p>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            Sin humo. <span className="italic font-light">Solo deporte.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-black/60">
            Planes claros, sin permanencia. Empieza por donde quieras y escala cuando los resultados lo pidan.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.n}
              className={`p-8 md:p-10 border flex flex-col ${p.h ? "bg-black text-white border-black scale-100 md:scale-105 shadow-2xl" : "border-black/15"}`}
            >
              {p.h && <span className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-70">Recomendado</span>}
              <h3 className="text-sm uppercase tracking-widest font-bold opacity-70">{p.n}</h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-bold">{p.p}</span>
                <span className="text-sm opacity-60">{p.per}</span>
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
                className={`mt-10 inline-flex items-center justify-center gap-2 px-6 py-4 text-sm uppercase tracking-widest font-semibold border ${p.h ? "bg-white text-black border-white hover:bg-white/90" : "border-black hover:bg-black hover:text-white"}`}
              >
                Empezar <ArrowRight size={14}/>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
