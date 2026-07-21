import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/nosotros")({
  component: Nosotros,
  head: () => ({
    meta: [
      { title: "Nosotros — In The CLAB | Marketing Deportivo en Málaga" },
      { name: "description", content: "Conoce a In The CLAB: agencia de marketing deportivo nacida en Málaga, especializada exclusivamente en deporte. Branding, estrategia y audiovisual." },
      { property: "og:title", content: "Nosotros — In The CLAB" },
      { property: "og:description", content: "Agencia de marketing deportivo nacida en Málaga, especializada exclusivamente en deporte." },
      { property: "og:url", content: "https://clabagency.com/nosotros" },
      { property: "og:image", content: "https://clabagency.com/media/og-image.jpg" },
      { name: "twitter:image", content: "https://clabagency.com/media/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://clabagency.com/nosotros" }],
  }),
});

export default function Nosotros() {
  const { t } = useI18n();
  const paragraphs = t<string[]>("nosotros.paragraphs");
  const values = t<[string, string][]>("nosotros.values");

  return (
    <div className="bg-white text-black">
      <Navbar />

      <section id="main-content" tabIndex={-1} className="pt-40 pb-24 md:pt-52 md:pb-32 px-5 md:px-10">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <img src="/media/bk-trainer.jpg" alt="Entrenador en el campo" className="w-full aspect-[4/5] object-cover grayscale" />
          </div>
          <div className="flex flex-col justify-center max-w-md">
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/40 mb-3">{t<string>("nosotros.sectionLabel")}</p>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {t<string>("nosotros.heading1")}
              {t<string>("nosotros.heading2") ? (
                <> <span className="italic font-light">{t<string>("nosotros.heading2")}</span></>
              ) : null}
            </h2>
            <div className="mt-5 space-y-3 text-sm md:text-[15px] text-black/70 leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-24 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">{t<string>("nosotros.valuesLabel")}</p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-16">
            {t<string>("nosotros.valuesTitle")}
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-20 md:mb-24 max-w-5xl">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-4">
                {t<string>("nosotros.misionLabel")}
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                {t<string>("nosotros.mision")}
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-4">
                {t<string>("nosotros.visionLabel")}
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                {t<string>("nosotros.vision")}
              </p>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-8">
            {t<string>("nosotros.valoresLabel")}
          </h3>
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
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">{t<string>("nosotros.ctaTitle")}</h2>
        <Link to="/contacto" className="mt-10 inline-flex items-center gap-3 bg-black text-white px-8 py-5 text-sm uppercase tracking-widest font-semibold hover:bg-black/80">
          {t<string>("nosotros.ctaBtn")} <ArrowRight size={16}/>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
