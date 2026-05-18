import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  { n: "01", t: "Branding", d: "Construimos identidades que se reconocen desde la grada." },
  { n: "02", t: "Redes Sociales", d: "Contenido con energía deportiva. Constante, estratégico, real." },
  { n: "03", t: "Optimización Digital", d: "Tu club, tu academia, tu centro — visible donde importa." },
  { n: "04", t: "Audiovisual", d: "Vídeo y foto que transmiten lo que se vive en el campo." },
];

const reasons = [
  ["Solo deporte", "No tocamos otros sectores. Vivimos del fútbol y para el fútbol."],
  ["Equipo joven", "Hablamos el idioma de las nuevas generaciones de aficionados."],
  ["Resultados visibles", "Métricas claras. Crecimiento real. Cero humo."],
  ["Pasión propia", "Lo hacemos porque también somos parte de la grada."],
];

const plans = [
  { n: "Básico", p: "120€", per: "/mes", h: false },
  { n: "Medio", p: "250€", per: "/mes", h: true },
  { n: "Premium", p: "A medida", per: "", h: false },
];

export default function Home() {
  return (
    <div className="bg-white text-black">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-black text-white pt-24">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
          poster="/media/bk-trainer.jpg"
        >
          <source src="/media/bk.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl w-full px-5 md:px-10 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/70 mb-6">
              Agencia de marketing deportivo · Málaga
            </p>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tight uppercase">
              La pasión<br/>ya está.<br/>
              <span className="text-white/50">Nosotros la</span><br/>
              <span className="italic font-light">hacemos visible.</span>
            </h1>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contacto" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-white/90">
                Trabaja con nosotros <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link to="/servicios" className="inline-flex items-center gap-3 border border-white px-7 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-black">
                Ver servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24 md:py-40 px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-8">Manifiesto</p>
          <h2 className="text-3xl md:text-6xl font-bold leading-tight tracking-tight">
            En el deporte no se vende. <span className="text-black/40">Se contagia.</span> Nosotros somos el altavoz de lo que ya late dentro del club.
          </h2>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-black text-white py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Qué hacemos</p>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Servicios</h2>
            </div>
            <Link to="/servicios" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-60">
              Ver todos <ArrowUpRight size={16}/>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {services.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-black p-8 md:p-10 hover:bg-white hover:text-black transition-colors duration-500 group cursor-default"
              >
                <span className="text-xs font-mono opacity-50">{s.n}</span>
                <h3 className="mt-6 text-2xl md:text-3xl font-bold uppercase">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed opacity-70 group-hover:opacity-100">{s.d}</p>
                <ArrowUpRight size={20} className="mt-8 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"/>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SHOWCASE */}
      <section className="py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-4">Lo que se vive</p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-12 max-w-3xl">
            Trabajos que <span className="italic font-light">respiran deporte.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-black">
            {["bro.mp4", "psg.mp4", "brost.mp4"].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="relative aspect-[3/4] overflow-hidden bg-black group"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:grayscale transition-all duration-700"
                >
                  <source src={`/media/${src}`} type="video/mp4" />
                </video>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white text-xs uppercase tracking-widest">Proyecto · 0{i+1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* PLANS */}
      <section className="bg-black text-white py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Planes</p>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Trabaja con Clab</h2>
            </div>
            <Link to="/planes" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-60">
              Ver detalle <ArrowUpRight size={16}/>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.n}
                className={`p-8 md:p-10 border ${p.h ? "bg-white text-black border-white" : "border-white/20"}`}
              >
                <h3 className="text-sm uppercase tracking-widest font-semibold opacity-70">{p.n}</h3>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl md:text-6xl font-bold">{p.p}</span>
                  <span className="text-sm opacity-60">{p.per}</span>
                </div>
                <Link to="/planes" className={`mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold border px-5 py-3 ${p.h ? "border-black hover:bg-black hover:text-white" : "border-white hover:bg-white hover:text-black"}`}>
                  Más info <ArrowRight size={14}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-24 md:py-40 px-5 md:px-10 bg-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            "El marketing deportivo no es vender camisetas. <span className="italic font-light text-black/50">Es hacer que la gente quiera ponérselas."</span>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none">
            ¿Listos para<br/><span className="italic font-light">hacerla visible?</span>
          </h2>
          <Link to="/contacto" className="mt-12 inline-flex items-center gap-3 bg-white text-black px-8 py-5 text-sm uppercase tracking-widest font-semibold hover:bg-white/90">
            Hablemos <ArrowRight size={16}/>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
