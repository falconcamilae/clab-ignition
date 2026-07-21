import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@formspree/react";
import { Instagram, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/contacto")({
  component: Contacto,
  head: () => ({
    meta: [
      { title: "Contacto — In The CLAB | Agencia de Marketing Deportivo" },
      { name: "description", content: "Hablemos. Contacta con In The CLAB, agencia de marketing deportivo en Málaga para clubes, academias y centros deportivos." },
      { property: "og:title", content: "Contacto — In The CLAB" },
      { property: "og:description", content: "Hablemos. Contacta con In The CLAB, agencia de marketing deportivo en Málaga." },
      { property: "og:url", content: "https://clabagency.com/contacto" },
      { property: "og:image", content: "https://clabagency.com/media/og-image.jpg" },
      { name: "twitter:image", content: "https://clabagency.com/media/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://clabagency.com/contacto" }],
  }),
});

export default function Contacto() {
  const { t } = useI18n();
  const [state, handleSubmit] = useForm((import.meta.env.VITE_FORMSPREE_ID as string) || "mlgvddrz");
  const fields = t<Record<string, string>>("contacto.fields");
  const planOptions = t<string[]>("contacto.planOptions");

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <section id="main-content" tabIndex={-1} className="pt-40 pb-16 md:pt-52 md:pb-20 px-5 md:px-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">{t<string>("contacto.label")}</p>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            {t<string>("contacto.title1")} <span className="italic font-light">{t<string>("contacto.title2")}</span>
          </h1>
          <p className="mt-8 inline-block bg-white text-black px-6 py-3 text-sm md:text-base uppercase tracking-widest font-bold">
            {t<string>("contacto.cta")}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">{t<string>("contacto.findUs")}</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="mt-1"/>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">{t<string>("contacto.location")}</p>
                  <p className="mt-1">{t<string>("contacto.locationVal")}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="mt-1"/>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">{t<string>("contacto.email")}</p>
                  <a href="mailto:contacto@intheclab.com" className="mt-1 inline-block hover:opacity-70">contacto@intheclab.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Instagram size={20} className="mt-1"/>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">{t<string>("contacto.instagram")}</p>
                  <a href="https://instagram.com/weareclab" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block hover:opacity-70">@weareclab</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Linkedin size={20} className="mt-1"/>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">LinkedIn</p>
                  <a href="https://www.linkedin.com/company/weareclab" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block hover:opacity-70">weareclab</a>
                </div>
              </li>
            </ul>

            <div className="mt-16 border-t border-white/10 pt-8">
              <p className="text-2xl md:text-3xl font-bold leading-tight">
                {t<string>("contacto.reply")}
              </p>
            </div>
          </div>

          {state.succeeded ? (
            <div
              role="status"
              aria-live="polite"
              className="border border-white/15 p-6 md:p-10 bg-white/[0.02] flex flex-col items-center justify-center text-center"
            >
              <p className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">{t<string>("contacto.successTitle")}</p>
              <p className="text-lg text-white/70">{t<string>("contacto.successBody")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="border border-white/15 p-6 md:p-10 bg-white/[0.02]">
              {/* Honeypot anti-spam: campo oculto que los bots suelen rellenar.
                  Formspree ignora envíos donde `_gotcha` viene con valor. */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
                <label>
                  No rellenar
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="grid gap-5">
                <Field label={fields.nombre} htmlFor="c-nombre" required>
                  <input id="c-nombre" required aria-required="true" autoComplete="name" name="nombre" type="text" className="bg-transparent border-b border-white/30 py-3 font-semibold text-white focus:outline-none focus:border-white" />
                </Field>
                <Field label={fields.club} htmlFor="c-club" required>
                  <input id="c-club" required aria-required="true" autoComplete="organization" name="club" type="text" className="bg-transparent border-b border-white/30 py-3 font-semibold text-white focus:outline-none focus:border-white" />
                </Field>
                <Field label={fields.email} htmlFor="c-email" required>
                  <input id="c-email" required aria-required="true" autoComplete="email" name="email" type="email" className="bg-transparent border-b border-white/30 py-3 font-semibold text-white focus:outline-none focus:border-white" />
                </Field>
                <Field label={fields.telefono} htmlFor="c-tel">
                  <input id="c-tel" autoComplete="tel" name="telefono" type="tel" className="bg-transparent border-b border-white/30 py-3 font-semibold text-white focus:outline-none focus:border-white" />
                </Field>
                <Field label={fields.plan} htmlFor="c-plan">
                  <select id="c-plan" name="plan" className="bg-black border-b border-white/30 py-3 font-semibold text-white focus:outline-none focus:border-white">
                    {planOptions.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label={fields.mensaje} htmlFor="c-msg" required>
                  <textarea id="c-msg" required aria-required="true" name="mensaje" rows={4} className="bg-transparent border-b border-white/30 py-3 font-semibold text-white focus:outline-none focus:border-white resize-none" />
                </Field>
                <button
                  type="submit"
                  disabled={state.submitting}
                  aria-busy={state.submitting}
                  className="mt-4 inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm uppercase tracking-widest font-semibold hover:bg-white/90 disabled:opacity-60"
                >
                  {state.submitting ? t<string>("contacto.submitting") : <>{t<string>("contacto.submit")} <Send size={16} aria-hidden="true"/></>}
                </button>
                <div role="alert" aria-live="assertive" className="min-h-[1.25rem]">
                  {state.errors && (
                    <p className="mt-2 text-sm text-red-400">{t<string>("contacto.error")}</p>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, children, htmlFor, required }: { label: string; children: React.ReactNode; htmlFor?: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/70">
        {label}{required && <span aria-hidden="true"> *</span>}
      </span>
      {children}
    </label>
  );
}
