import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/nosotros")({
  component: Nosotros,
  head: () => ({
    meta: [
      { title: "Nosotros — In The Clab" },
      { name: "description", content: "Agencia de marketing deportivo en Málaga. Equipo joven especializado exclusivamente en deporte." },
    ],
  }),
});

const values = [
  ["Pasión", "Vivimos lo que comunicamos."],
  ["Foco", "Solo deporte. Sin excepciones."],
  ["Cercanía", "Hablamos con el club, no para el club."],
  ["Resultado", "Métricas, crecimiento, comunidad."],
];

export default function Nosotros() {
  return (
    <div className="bg-white text-black">
      <Navbar />

      <section className="pt-40 pb-20 md:pt-52 md:pb-28 px-5 md:px-10 border-b border-black/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-6">Nosotros</p>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            Una agencia <span className="italic font-light">con escudo.</span>
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16">
          <div>
            <img src="/media/bk-trainer.jpg" alt="Entrenador en el campo" className="w-full aspect-[4/5] object-cover grayscale" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-4">Quiénes somos</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Clab nace en Málaga, entre <span className="italic font-light">balones, cámaras y datos.</span>
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg text-black/70 leading-relaxed">
              <p>
                Somos un equipo joven que entendió algo simple: los clubes y academias deportivas no necesitan una agencia más. Necesitan una agencia que respire fútbol.
              </p>
              <p>
                Por eso solo trabajamos con deporte. Porque entendemos las cantera, la grada, los lunes después de perder y los domingos después de ganar.
              </p>
              <p>
                La pasión ya está. Nosotros la hacemos visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Valores</p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-16">
            Lo que nos mueve.
          </h2>
          <div className="grid md:grid-cols-4 gap-px bg-white/10">
            {values.map((v) => (
              <div key={v[0]} className="bg-black p-8 md:p-10 hover:bg-white hover:text-black transition-colors duration-500">
                <h3 className="text-2xl md:text-3xl font-bold uppercase">{v[0]}</h3>
                <p className="mt-4 text-sm opacity-70">{v[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-5 md:px-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">¿Hablamos?</h2>
        <Link to="/contacto" className="mt-10 inline-flex items-center gap-3 bg-black text-white px-8 py-5 text-sm uppercase tracking-widest font-semibold hover:bg-black/80">
          Contacto <ArrowRight size={16}/>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
