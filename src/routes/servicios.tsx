import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/servicios")({
  component: Servicios,
  head: () => ({
    meta: [
      { title: "Servicios — In The Clab" },
      { name: "description", content: "Branding, redes sociales, optimización digital y audiovisual para clubes y academias deportivas." },
    ],
  }),
});

const services = [
  {
    n: "01",
    t: "Branding Deportivo",
    d: "Construimos identidades visuales que se reconocen desde la grada. Escudo, tipografías, kit gráfico, manual de marca. Identidad que aguanta cualquier camiseta.",
    points: ["Identidad visual completa", "Rediseño de escudo", "Manual de marca", "Aplicaciones merchandising"],
    light: true,
  },
  {
    n: "02",
    t: "Redes Sociales",
    d: "Contenido constante con energía deportiva. Estrategia, plantillas, calendario editorial y comunidad. Hacemos que tu club hable todos los días.",
    points: ["Estrategia de contenido", "Diseño de publicaciones", "Gestión de comunidad", "Cobertura de partidos"],
    light: false,
  },
  {
    n: "03",
    t: "Optimización Digital",
    d: "Web, SEO local, Google Business, captación de socios y jugadores. Que cuando alguien busque entrenar en su barrio, te encuentre primero.",
    points: ["Web institucional", "SEO local Málaga", "Google Business", "Captación de leads"],
    light: true,
  },
  {
    n: "04",
    t: "Audiovisual",
    d: "Vídeo y foto que transmiten lo que se vive en el campo. Reels, mini-documentales, presentaciones de jugadores, resúmenes de partido.",
    points: ["Reels y shorts", "Fotografía deportiva", "Mini-documentales", "Resúmenes de partido"],
    light: false,
  },
];

export default function Servicios() {
  return (
    <div className="bg-white text-black">
      <Navbar />

      <section className="pt-40 pb-20 md:pt-52 md:pb-28 px-5 md:px-10 border-b border-black/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-6">Servicios</p>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            Todo lo que tu club <span className="italic font-light">necesita.</span>
          </h1>
        </div>
      </section>

      {services.map((s, i) => (
        <section
          key={s.n}
          className={`px-5 md:px-10 py-24 md:py-32 ${s.light ? "bg-white text-black" : "bg-black text-white"}`}
        >
          <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <span className={`text-xs font-mono ${s.light ? "text-black/40" : "text-white/40"}`}>{s.n} / 04</span>
              <h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none">{s.t}</h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg md:text-xl leading-relaxed opacity-80">{s.d}</p>
              <ul className="mt-10 grid sm:grid-cols-2 gap-4">
                {s.points.map((p) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-3 py-3 border-b ${s.light ? "border-black/10" : "border-white/10"}`}
                  >
                    <ArrowRight size={14}/> <span className="text-sm uppercase tracking-wide">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-black text-white py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">¿Te encaja?</h2>
          <Link to="/contacto" className="mt-10 inline-flex items-center gap-3 bg-white text-black px-8 py-5 text-sm uppercase tracking-widest font-semibold hover:bg-white/90">
            Cuéntanos tu proyecto <ArrowRight size={16}/>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
