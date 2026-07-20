import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/privacidad")({
  component: PrivacidadPage,
  head: () => ({
    meta: [
      { title: "Política de privacidad — In The CLAB" },
      { name: "description", content: "Política de privacidad y tratamiento de datos personales de In The CLAB conforme al RGPD y LOPDGDD." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Política de privacidad — In The CLAB" },
      { property: "og:description", content: "Tratamiento de datos personales conforme al RGPD." },
      { property: "og:url", content: "https://clabagency.com/privacidad" },
    ],
    links: [{ rel: "canonical", href: "https://clabagency.com/privacidad" }],
  }),
});

function PrivacidadPage() {
  const { t } = useI18n();
  const sections = t<{ h: string; p: string }[]>("privacy.sections");

  return (
    <div className="bg-white text-black">
      <Navbar />
      <section id="main-content" tabIndex={-1} className="pt-40 pb-24 md:pt-52 md:pb-32 px-5 md:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-black/50">{t<string>("privacy.updated")}</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{t<string>("privacy.title")}</h1>
          <p className="mt-6 text-base md:text-lg text-black/70 leading-relaxed">{t<string>("privacy.intro")}</p>
          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-xl md:text-2xl font-semibold">{s.h}</h2>
                <p className="mt-3 text-black/70 leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
