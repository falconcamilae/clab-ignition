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
      { title: "Contacto — In The Clab" },
      { name: "description", content: "Hablemos. Contacta con In The Clab, agencia de marketing deportivo en Málaga." },
    ],
  }),
});

export default function Contacto() {
  const { t } = useI18n();
  const [state, handleSubmit] = useForm("mlgvddrz");
  const fields = t<Record<string, string>>("contacto.fields");
  const planOptions = t<string[]>("contacto.planOptions");

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="pt-40 pb-16 md:pt-52 md:pb-20 px-5 md:px-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">{t<string>("contacto.label")}</p>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            {t<string>("contacto.title1")} <span className="italic font-light">{t<string>("contacto.title2")}</span>
          </h1>
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
                  <p className="mt-1">contacto@intheclab.com</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Instagram size={20} className="mt-1"/>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">{t<string>("contacto.instagram")}</p>
                  <p className="mt-1">@wearclab</p>
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
            <div className="border border-white/15 p-6 md:p-10 bg-white/[0.02] flex flex-col items-center justify-center text-center">
              <p className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">{t<string>("contacto.successTitle")}</p>
              <p className="text-lg text-white/70">{t<string>("contacto.successBody")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-white/15 p-6 md:p-10 bg-white/[0.02]">
              <div className="grid gap-5">
                <Field label={fields.nombre}>
                  <input required name="nombre" type="text" className="bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white" />
                </Field>
                <Field label={fields.club}>
                  <input required name="club" type="text" className="bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white" />
                </Field>
                <Field label={fields.email}>
                  <input required name="email" type="email" className="bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white" />
                </Field>
                <Field label={fields.telefono}>
                  <input name="telefono" type="tel" className="bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white" />
                </Field>
                <Field label={fields.plan}>
                  <select name="plan" className="bg-black border-b border-white/30 py-3 focus:outline-none focus:border-white">
                    {planOptions.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label={fields.mensaje}>
                  <textarea required name="mensaje" rows={4} className="bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white resize-none" />
                </Field>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="mt-4 inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm uppercase tracking-widest font-semibold hover:bg-white/90 disabled:opacity-60"
                >
                  {state.submitting ? t<string>("contacto.submitting") : <>{t<string>("contacto.submit")} <Send size={16}/></>}
                </button>
                {state.errors && (
                  <div className="mt-2 text-sm text-red-400">
                    <p>{t<string>("contacto.error")}</p>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</span>
      {children}
    </label>
  );
}
