import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

const KEY = "clab-cookie-consent";

export function CookieBanner() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (!stored) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (c: Omit<Consent, "ts" | "necessary">) => {
    const consent: Consent = { necessary: true, ...c, ts: Date.now() };
    try {
      localStorage.setItem(KEY, JSON.stringify(consent));
    } catch {}
    setOpen(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
          role="dialog"
          aria-live="polite"
          aria-label={t<string>("cookieBanner.title")}
        >
          <div className="mx-auto max-w-4xl bg-white text-black rounded-lg shadow-2xl border border-black/10 overflow-hidden">
            <div className="p-5 md:p-6">
              <h3 className="text-base md:text-lg font-semibold">
                {t<string>("cookieBanner.title")}
              </h3>
              <p className="mt-2 text-sm text-black/70 leading-relaxed">
                {t<string>("cookieBanner.text")}{" "}
                <Link to="/cookies" className="underline hover:opacity-70">
                  {t<string>("cookieBanner.policyLink")}
                </Link>
                .
              </p>

              {showSettings && (
                <div className="mt-5 space-y-3 border-t border-black/10 pt-4">
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
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2 justify-end">
                {!showSettings && (
                  <button
                    onClick={() => setShowSettings(true)}
                    className="text-sm px-4 py-2 rounded border border-black/20 hover:bg-black/5"
                  >
                    {t<string>("cookieBanner.settings")}
                  </button>
                )}
                <button
                  onClick={() => save({ analytics: false, marketing: false })}
                  className="text-sm px-4 py-2 rounded border border-black/20 hover:bg-black/5"
                >
                  {t<string>("cookieBanner.reject")}
                </button>
                {showSettings ? (
                  <button
                    onClick={() => save({ analytics, marketing })}
                    className="text-sm px-4 py-2 rounded bg-black text-white hover:opacity-80"
                  >
                    {t<string>("cookieBanner.save")}
                  </button>
                ) : (
                  <button
                    onClick={() => save({ analytics: true, marketing: true })}
                    className="text-sm px-4 py-2 rounded bg-black text-white hover:opacity-80"
                  >
                    {t<string>("cookieBanner.accept")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
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
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-black disabled:opacity-60"
      />
      <span className="flex-1">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-black/60 mt-0.5">{desc}</span>
      </span>
    </label>
  );
}
