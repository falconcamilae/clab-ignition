import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Sparkles, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { getConsent, saveConsent, subscribeOpen } from "@/lib/consent";

export function CookieBanner() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    // Primera visita o versión de política caducada → abrir automáticamente.
    if (!getConsent()) setOpen(true);
    // Reapertura manual desde Footer / página /cookies.
    return subscribeOpen(() => {
      const current = getConsent();
      if (current) {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
      setShowSettings(true);
      setOpen(true);
    });
  }, []);

  const save = (c: { analytics: boolean; marketing: boolean }) => {
    saveConsent(c);
    setOpen(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Subtle backdrop to draw attention without blocking */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-[2px] pointer-events-none"
            aria-hidden
          />

          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
            role="dialog"
            aria-live="polite"
            aria-modal="false"
            aria-label={t<string>("cookieBanner.title")}
          >
            <div className="relative mx-auto max-w-3xl">
              {/* Ambient glow */}
              <div
                aria-hidden
                className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/20 via-white/40 to-white/20 blur-xl opacity-60 pointer-events-none"
              />

              <div className="relative bg-white text-black rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-black/10 overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-black via-neutral-700 to-black" />

                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex shrink-0 h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                      <Cookie size={20} strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold tracking-tight leading-tight">
                        {t<string>("cookieBanner.title")}
                      </h3>
                      <p className="mt-2 text-sm md:text-[15px] text-black/70 leading-relaxed">
                        {t<string>("cookieBanner.text")}
                      </p>
                      <p className="mt-2 text-xs text-black/50">
                        {t<string>("cookieBanner.moreInfo")}{" "}
                        <Link to="/cookies" className="underline underline-offset-2 hover:opacity-70">
                          {t<string>("cookieBanner.policyLink")}
                        </Link>
                        .
                      </p>
                    </div>

                    <button
                      onClick={() => save({ analytics: false, marketing: false })}
                      className="hidden sm:flex shrink-0 h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 text-black/40 hover:text-black/70 transition"
                      aria-label={t<string>("cookieBanner.reject")}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-6 space-y-4 border-t border-black/10 pt-5 overflow-hidden"
                    >
                      <Row
                        label={t<string>("cookieBanner.necessary")}
                        desc={t<string>("cookieBanner.necessaryDesc")}
                        checked
                        disabled
                        onChange={() => {}}
                      />
                      <Row
                        label={t<string>("cookieBanner.analytics")}
                        desc={t<string>("cookieBanner.analyticsDesc")}
                        checked={analytics}
                        onChange={setAnalytics}
                      />
                      <Row
                        label={t<string>("cookieBanner.marketing")}
                        desc={t<string>("cookieBanner.marketingDesc")}
                        checked={marketing}
                        onChange={setMarketing}
                      />
                    </motion.div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Primary — hero button */}
                    {showSettings ? (
                      <button
                        onClick={() => save({ analytics, marketing })}
                        className="order-1 sm:order-2 flex-1 relative group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white font-semibold text-sm tracking-wide hover:bg-neutral-800 transition shadow-lg shadow-black/20"
                      >
                        {t<string>("cookieBanner.save")}
                      </button>
                    ) : (
                      <button
                        onClick={() => save({ analytics: true, marketing: true })}
                        className="order-1 sm:order-2 flex-1 relative group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white font-semibold text-sm tracking-wide hover:bg-neutral-800 transition shadow-lg shadow-black/20"
                      >
                        <Sparkles size={16} className="opacity-90" />
                        <span>{t<string>("cookieBanner.accept")}</span>
                        <span className="hidden md:inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                          {t<string>("cookieBanner.recommended")}
                        </span>
                      </button>
                    )}

                    {/* Secondary — settings */}
                    {!showSettings && (
                      <button
                        onClick={() => setShowSettings(true)}
                        className="order-2 sm:order-1 inline-flex items-center justify-center px-5 py-3 rounded-xl border border-black/15 text-sm font-medium hover:bg-black/5 transition"
                      >
                        {t<string>("cookieBanner.settings")}
                      </button>
                    )}

                    {/* Tertiary — reject (respected, not hidden, but low-emphasis) */}
                    <button
                      onClick={() => save({ analytics: false, marketing: false })}
                      className="order-3 text-xs text-black/50 hover:text-black/80 underline underline-offset-4 sm:mr-1 sm:ml-auto"
                    >
                      {t<string>("cookieBanner.reject")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <span className="relative inline-flex mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`h-5 w-9 rounded-full transition ${
            checked ? "bg-black" : "bg-black/15"
          } ${disabled ? "opacity-60" : ""}`}
        />
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-xs text-black/60 mt-0.5 leading-relaxed">{desc}</span>
      </span>
    </label>
  );
}
