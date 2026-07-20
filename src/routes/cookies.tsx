import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Política de cookies — In The CLAB" },
      { name: "description", content: "Política de cookies de In The CLAB conforme al RGPD, LOPDGDD y LSSI-CE." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Política de cookies — In The CLAB" },
      { property: "og:description", content: "Uso de cookies en el sitio web de In The CLAB." },
      { property: "og:url", content: "https://clabagency.com/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://clabagency.com/cookies" }],
  }),
});

function CookiesPage() {
  const { t } = useI18n();
  const sections = t<{ h: string; p: string }[]>("cookies.sections");

  return (
    <div className="bg-white text-black">
      <Navbar />
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 px-5 md:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-black/50">{t<string>("cookies.updated")}</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{t<string>("cookies.title")}</h1>
          <p className="mt-6 text-base md:text-lg text-black/70 leading-relaxed">{t<string>("cookies.intro")}</p>
          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-xl md:text-2xl font-semibold">{s.h}</h2>
                <p className="mt-3 text-black/70 leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t border-black/10">
            <button
              onClick={() => {
                try { localStorage.removeItem("clab-cookie-consent"); } catch {}
                if (typeof window !== "undefined") window.location.reload();
              }}
              className="text-sm px-5 py-3 rounded bg-black text-white hover:opacity-80"
            >
              {t<string>("cookieBanner.settings")}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
