import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Mail, MapPin, Send } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

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
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    toast.success("Mensaje recibido. Te contactamos en menos de 24h.");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="pt-40 pb-16 md:pt-52 md:pb-20 px-5 md:px-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Contacto</p>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            Hablemos de <span className="italic font-light">tu club.</span>
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">Encuéntranos</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="mt-1"/>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">Ubicación</p>
                  <p className="mt-1">Málaga, España</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="mt-1"/>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">Email</p>
                  <p className="mt-1">[hola@intheclab.com]</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Instagram size={20} className="mt-1"/>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">Instagram</p>
                  <p className="mt-1">[@intheclab]</p>
                </div>
              </li>
            </ul>

            <div className="mt-16 border-t border-white/10 pt-8">
              <p className="text-2xl md:text-3xl font-bold leading-tight">
                "Respondemos en menos de <span className="italic font-light">24 horas.</span>"
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border border-white/15 p-6 md:p-10 bg-white/[0.02]">
            <div className="grid gap-5">
              <Field label="Nombre">
                <input required name="name" type="text" className="bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white" />
              </Field>
              <Field label="Email">
                <input required name="email" type="email" className="bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white" />
              </Field>
              <Field label="Teléfono">
                <input name="phone" type="tel" className="bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white" />
              </Field>
              <Field label="Plan de interés">
                <select name="plan" className="bg-black border-b border-white/30 py-3 focus:outline-none focus:border-white">
                  <option>Básico</option>
                  <option>Medio</option>
                  <option>Premium</option>
                  <option>No lo tengo claro</option>
                </select>
              </Field>
              <Field label="Cuéntanos tu proyecto">
                <textarea required name="message" rows={4} className="bg-transparent border-b border-white/30 py-3 focus:outline-none focus:border-white resize-none" />
              </Field>
              <button
                type="submit"
                disabled={sent}
                className="mt-4 inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm uppercase tracking-widest font-semibold hover:bg-white/90 disabled:opacity-60"
              >
                {sent ? "Enviado ✓" : <>Enviar mensaje <Send size={16}/></>}
              </button>
            </div>
          </form>
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
