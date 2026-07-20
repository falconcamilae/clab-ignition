/**
 * Cabeceras de seguridad HTTP aplicadas a todas las respuestas SSR.
 *
 * Notas de diseño:
 * - `Content-Security-Policy` se envía en modo `Report-Only` durante la fase
 *   de rodaje: los navegadores reportan violaciones pero NO bloquean nada.
 *   Cuando se confirme que no hay falsos positivos en producción, se puede
 *   cambiar la clave a `Content-Security-Policy` (enforce) sin tocar el
 *   resto del código.
 * - El resto de headers (HSTS, X-Content-Type-Options, Referrer-Policy,
 *   Permissions-Policy, X-Frame-Options, Cross-Origin-*) son seguros de
 *   aplicar directamente: no rompen ni fuentes ni vídeos ni Formspree.
 * - Solo se aplican a respuestas HTML/SSR. Assets estáticos (JS, CSS,
 *   fuentes, vídeos) los sirve Cloudflare directamente y no pasan por aquí.
 */

// Allowlist alineado con lo que carga el sitio hoy:
// - Google Fonts (stylesheet + ficheros de fuente)
// - Formspree (envío del formulario de contacto)
// - Mismo origen para vídeos, imágenes, scripts y estilos generados
const CSP_DIRECTIVES: Record<string, string[]> = {
  "default-src": ["'self'"],
  // React SSR + Vite inyectan scripts inline durante la hidratación.
  "script-src": ["'self'", "'unsafe-inline'"],
  // Tailwind + framer-motion generan estilos inline; Google Fonts entrega CSS.
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
  "img-src": ["'self'", "data:", "blob:"],
  "media-src": ["'self'"],
  // Formspree recibe el POST del formulario de contacto.
  "connect-src": ["'self'", "https://formspree.io", "https://*.formspree.io"],
  "form-action": ["'self'", "https://formspree.io", "https://*.formspree.io"],
  "frame-ancestors": ["'none'"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
  "manifest-src": ["'self'"],
  "worker-src": ["'self'", "blob:"],
  "upgrade-insecure-requests": [],
};

function buildCsp(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([k, v]) => (v.length ? `${k} ${v.join(" ")}` : k))
    .join("; ");
}

const CSP = buildCsp();

const STATIC_HEADERS: Record<string, string> = {
  // Fuerza HTTPS 2 años + preload. Cloudflare ya sirve HTTPS.
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Bloquea APIs sensibles que la web no necesita.
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "payment=()",
    "usb=()",
    "magnetometer=()",
    "gyroscope=()",
    "accelerometer=()",
    "interest-cohort=()",
  ].join(", "),
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-DNS-Prefetch-Control": "on",
};

/**
 * Devuelve una respuesta clonada con las cabeceras de seguridad aplicadas.
 * Solo aplica CSP a respuestas HTML para no interferir con XML/JSON (p.ej.
 * `/sitemap.xml`, respuestas de error JSON de h3, etc.).
 */
export function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  for (const [k, v] of Object.entries(STATIC_HEADERS)) {
    if (!headers.has(k)) headers.set(k, v);
  }

  const contentType = headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    // Report-Only durante la fase de rodaje. Cambiar a
    // "Content-Security-Policy" cuando se valide que no hay reportes.
    if (!headers.has("Content-Security-Policy-Report-Only")) {
      headers.set("Content-Security-Policy-Report-Only", CSP);
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
