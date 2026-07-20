import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translations, type Lang } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <T = any>(path: string) => T;
};

const I18nContext = createContext<Ctx>({
  lang: "es",
  setLang: () => {},
  t: (p) => p as any,
});

function resolve(obj: any, path: string): any {
  return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Always start at "es" on both server and client first render to avoid hydration mismatches.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("clab-lang") as Lang | null;
      if (stored && stored !== "es" && (stored === "en" || stored === "it")) {
        setLangState(stored);
      }
    } catch {}
  }, []);

  // Sync <html lang> with the active language (SEO + a11y). Runs client-side only
  // so it doesn't break SSR hydration (shell always renders lang="es").
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("clab-lang", l);
    } catch {}
  }, []);

  const t = useCallback(
    <T,>(path: string): T => {
      const v = resolve(translations[lang], path);
      if (v === undefined || v === null) {
        return resolve(translations.es, path) as T;
      }
      return v as T;
    },
    [lang]
  );

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
