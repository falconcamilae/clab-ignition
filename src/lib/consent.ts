/**
 * Consent Mode central para CLAB.
 *
 * Objetivo: cualquier script de terceros (analítica, píxeles, mapas, etc.)
 * consulta este módulo antes de ejecutarse. Si el usuario no ha dado
 * consentimiento para su categoría, no se carga.
 *
 * Estado guardado en `localStorage` bajo la clave `clab-cookie-consent`.
 * Se versiona con `CONSENT_VERSION`: si la política cambia, se sube la
 * versión y el banner reaparece automáticamente para pedir consentimiento
 * de nuevo (obligación del RGPD).
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
  version: number;
};

const STORAGE_KEY = "clab-cookie-consent";
const OPEN_EVENT = "clab:open-cookie-preferences";
const CHANGE_EVENT = "clab:consent-change";

/** Subir este número invalida los consentimientos anteriores y reabre el banner. */
export const CONSENT_VERSION = 1;

function safeParse(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed !== "object" || parsed === null) return null;
    if (typeof parsed.version !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Lee el estado actual. Devuelve null si no hay consentimiento válido o si
 *  la versión guardada es anterior a la vigente. */
export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = safeParse(window.localStorage.getItem(STORAGE_KEY));
    if (!stored) return null;
    if (stored.version < CONSENT_VERSION) return null;
    return stored;
  } catch {
    return null;
  }
}

/** True si el usuario ha aceptado esa categoría. `necessary` siempre true. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const c = getConsent();
  return c ? Boolean(c[category]) : false;
}

/** Persiste una decisión de consentimiento y notifica a los suscriptores. */
export function saveConsent(input: { analytics: boolean; marketing: boolean }): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: input.analytics,
    marketing: input.marketing,
    ts: Date.now(),
    version: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent<ConsentState>(CHANGE_EVENT, { detail: state }));
  } catch {}
  pushGcmUpdate(state);
  return state;
}

/**
 * Google Consent Mode v2 stub. No cargamos GA/Meta todavía, pero dejamos las
 * señales listas en `dataLayer` para que cualquier script futuro respete la
 * decisión del usuario desde el primer render. Denegado por defecto.
 */
type Gcm = {
  ad_storage: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

function pushGcmUpdate(state: ConsentState): void {
  if (typeof window === "undefined") return;
  const dl = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ??= []);
  const consent: Gcm = {
    ad_storage: state.marketing ? "granted" : "denied",
    analytics_storage: state.analytics ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
  };
  try {
    dl.push({ event: "consent_update", consent });
  } catch {}
}

/** Inicializa el estado por defecto en `dataLayer` (denied). Llamar una vez al arrancar la app. */
export function initConsentDefaults(): void {
  if (typeof window === "undefined") return;
  const dl = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ??= []);
  const denied: Gcm = {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
  try {
    dl.push({ event: "consent_default", consent: denied });
  } catch {}
  const current = getConsent();
  if (current) pushGcmUpdate(current);
}

/** Reabre el banner de preferencias (usado desde Footer y desde /cookies). */
export function openPreferences(): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event(OPEN_EVENT));
  } catch {}
}

/** Suscripción a "abrir preferencias". Devuelve función para desuscribir. */
export function subscribeOpen(fn: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => fn();
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

/** Suscripción a cambios de consentimiento. Útil para cargar/descargar
 *  scripts de terceros cuando el usuario cambia sus preferencias. */
export function subscribeChange(fn: (state: ConsentState) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<ConsentState>).detail;
    if (detail) fn(detail);
  };
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}
