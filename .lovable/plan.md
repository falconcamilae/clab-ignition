## Objetivo

Aplicar mejoras técnicas y de operabilidad detectadas en las auditorías previas, **sin alterar** identidad visual (blanco/negro, Space Grotesk), estructura de rutas ni copywriting de marca. Todo el trabajo es de robustez, accesibilidad, SEO técnico e higiene legal.

## Alcance (qué se toca y qué no)

- No se cambia: paleta, tipografía, hero, secciones, textos de marketing, plans, media.
- Sí se cambia: metadatos técnicos, `<html lang>`, 404/500, atributos a11y, honeypot/labels, consent mode API, enlaces externos.

## Cambios

### 1. `<html lang>` dinámico según idioma activo
`src/routes/__root.tsx` renderiza siempre `lang="es"`. Añadir un efecto en `I18nProvider` (o en `RootComponent`) que sincronice `document.documentElement.lang` con el idioma seleccionado (`es` / `en` / `it`) tras la hidratación. Mantener `lang="es"` en el shell SSR para no romper hidratación.

Impacto: mejora SEO por idioma, accesibilidad de lectores de pantalla, y traducciones automáticas del navegador.

### 2. 404 y 500 con marca CLAB y traducidos
Actualmente `NotFoundComponent` y `ErrorComponent` en `__root.tsx` están en inglés y usan tokens `bg-background`/`bg-primary` genéricos.

- Rehacer ambos con fondo negro, tipografía Space Grotesk, botón blanco outline, logo o wordmark CLAB.
- Añadir claves nuevas en `src/i18n/translations.ts` (`errors.notFound.*`, `errors.generic.*`) para ES/EN/IT.
- El `errorComponent` mantiene `router.invalidate()` + `reset()`.
- `renderErrorPage()` en `src/lib/error-page.ts` (usado por el Worker en catastrofic-SSR): pasarla también a estética CLAB (HTML estático inline en negro con Space Grotesk vía fuentes del sistema como fallback, sin depender de Google Fonts en el fallback).

### 3. Accesibilidad (a11y) — mejoras no visibles
- **Skip link** "Saltar al contenido" en `Navbar` (visible solo con focus), enlazando a `#main`.
- Añadir `id="main"` y `role="main"` al `<main>` / primer contenedor de cada ruta (Home, Servicios, Planes, Nosotros, Contacto, Cookies, Privacidad).
- Botones-icono (menú hamburguesa, cierre banner, switcher idioma) con `aria-label` traducido cuando falte.
- Enlaces externos (Instagram, LinkedIn, email, tel) en `Footer.tsx`: añadir `rel="noopener noreferrer"` y `aria-label` descriptivo. `target="_blank"` solo en redes sociales.
- Respetar `prefers-reduced-motion`: envolver animaciones framer-motion clave con `useReducedMotion()` para desactivar entradas cuando el usuario lo pida.

### 4. Formulario de contacto — robustez y a11y
- Etiquetas visibles ya existen; añadir `aria-required`, `aria-invalid` cuando Formspree devuelve error, `autoComplete` correcto (`name`, `email`, `tel`, `organization`).
- Honeypot `_gotcha`: `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`.
- Estado de envío: `aria-live="polite"` en el bloque de éxito y de error (ya parcialmente hecho, revisar).
- Botón submit deshabilitado con spinner mientras `state.submitting`.

### 5. Consent Mode → gcm v2 stubs (sin cargar analítica todavía)
En `src/lib/consent.ts` añadir un helper que empuje al `dataLayer` los flags `ad_storage` / `analytics_storage` / `ad_user_data` / `ad_personalization` con valor `denied` por defecto y actualización cuando cambia el consentimiento. Esto deja el proyecto listo para GA4/Meta el día que se activen, sin cargar nada ahora.

Nada visual. El banner sigue igual.

### 6. SEO técnico — pulido
- Añadir `og:image` y `twitter:image` de fallback en `__root.tsx` **solo si** existe una imagen de marca subida (revisar `/public`); si no, dejar como está y documentar en `docs/security.md` que cada leaf define la suya. (En principio: no añadir por defecto para no sobreescribir leaf.)
- Confirmar `hreflang` alterno para las 3 lenguas: dado que el sitio no tiene rutas por idioma (`/en/…`), añadir `<link rel="alternate" hreflang="x-default">` apuntando a la misma URL y omitir per-idioma para no mentir. Añadir solo `hreflang="es"` self-referential en cada ruta.
- Verificar `robots.txt` incluye `Sitemap:` absoluto.

### 7. Higiene de dependencias
Ejecutar `bun outdated` y anotar en `docs/security.md` el estado. No actualizar mayores automáticamente (fuera de alcance). Solo dejar constancia.

## Fuera de alcance (para futuras fases)

- Split de `translations.ts` por dominio (Fase 5).
- Integración real de GA4/Plausible (requiere decisión de negocio).
- Tests automáticos (Fase 5).
- Refuerzo legal con NIF/domicilio/DPO (pendiente de datos del usuario).
- Textos de social proof (pendiente de datos reales del usuario).

## Verificación

- `tsgo` sin errores.
- `curl -I` a `/` mantiene cabeceras de seguridad de Fase 1.
- Cambio de idioma en Navbar → `<html lang>` actualizado en DevTools.
- Navegar a `/no-existe` → 404 con marca CLAB en el idioma activo.
- Enviar formulario vacío → mensajes a11y correctos; enviar con honeypot rellenado desde consola → Formspree rechaza.
- Tab desde la esquina superior → aparece "Saltar al contenido".

## Archivos afectados

- `src/routes/__root.tsx` (404/500, hreflang self)
- `src/i18n/I18nProvider.tsx` (sync `<html lang>`)
- `src/i18n/translations.ts` (nuevas claves de errores + a11y)
- `src/components/Navbar.tsx` (skip link, aria-labels)
- `src/components/Footer.tsx` (rel, aria)
- `src/routes/contacto.tsx` (aria-invalid, autoComplete, honeypot a11y)
- `src/lib/consent.ts` (gcm v2 stubs)
- `src/lib/error-page.ts` (marca CLAB, sin dependencia externa)
- Cada `src/routes/*.tsx` (id="main" y hreflang canonical self)
- `docs/security.md` (nota de dependencias)
