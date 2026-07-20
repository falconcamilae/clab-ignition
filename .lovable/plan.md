# Roadmap técnico CLAB — Plan por fases

Objetivo: cerrar los hallazgos de la auditoría minimizando riesgo de romper el sitio. Cada fase es autocontenida y desplegable; el orden va de "cero riesgo visual, máximo impacto legal/seguridad" a "mejoras de calidad y escalabilidad".

Leyenda de riesgo de rotura: 🟢 nulo · 🟡 bajo · 🟠 medio · 🔴 alto.

---

## FASE 0 — Higiene legal y de repositorio (día 1)

Ninguna tarea toca UI. Se puede desplegar sin QA visual.

### 0.1 Añadir LICENSE y NOTICE del proyecto
- Prioridad: **crítica**
- Por qué: sin licencia, todo el código es "todos los derechos reservados" por defecto, pero no queda documentado frente a auditoría de cliente/inversor. Un `LICENSE` propietario protege la marca y clarifica que el código no es open source.
- Tiempo: 20 min · Dificultad: baja · Riesgo: 🟢
- Archivos: `LICENSE` (nuevo), `NOTICE` (nuevo), `README.md` (nuevo).
- Dependencias: ninguna.
- Resultado: repositorio con titularidad clara y aviso de terceros (React, TanStack, framer-motion, lucide, etc.).

### 0.2 Inventario de dependencias OSS y compatibilidad de licencias
- Prioridad: **alta**
- Por qué: obligación de atribución (MIT/BSD/Apache) y comprobación de ausencia de GPL/AGPL en el bundle cliente.
- Tiempo: 30 min · Dificultad: baja · Riesgo: 🟢
- Archivos: `NOTICE`, `docs/third-party-licenses.md` (nuevo). Sin cambios de código.
- Dependencias: 0.1.
- Resultado: tabla de dependencias con licencia y enlace; confirma que todo es permisivo.

### 0.3 Revisar `package.json` (metadata, `private: true`, autor, homepage)
- Prioridad: media
- Por qué: evita publicación accidental en npm; deja rastro de propiedad.
- Tiempo: 10 min · Dificultad: baja · Riesgo: 🟢
- Archivos: `package.json`.
- Dependencias: 0.1.
- Resultado: metadata correcta y `"private": true`.

---

## FASE 1 — Seguridad de plataforma (día 1–2)

Cambios de cabeceras y configuración. No tocan JSX.

### 1.1 Cabeceras de seguridad HTTP
- Prioridad: **crítica**
- Por qué: sin CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` ni `Strict-Transport-Security` el sitio es vulnerable a XSS reflejado, clickjacking y filtración de referer. Requisito básico para una agencia que representa clubes.
- Tiempo: 1 h · Dificultad: media · Riesgo: 🟡 (CSP mal calibrada puede romper Google Fonts / vídeos).
- Archivos: `src/server.ts` (inyectar headers en la respuesta), o `public/_headers` si se prefiere ruta de Cloudflare Pages.
- Dependencias: ninguna.
- Resultado: A/A+ en securityheaders.com. Se validará con curl `-I` sobre cada ruta y con el vídeo hero funcionando.

### 1.2 Rate limiting / anti-spam del formulario de contacto
- Prioridad: alta
- Por qué: Formspree ya limita, pero conviene añadir honeypot y `submitting` deshabilitado para reducir bots.
- Tiempo: 30 min · Dificultad: baja · Riesgo: 🟢
- Archivos: `src/routes/contacto.tsx`.
- Dependencias: ninguna.
- Resultado: menos spam recibido; sin cambios visibles para el usuario.

### 1.3 Revisión de secretos y variables de entorno
- Prioridad: alta
- Por qué: confirmar que ningún token (Formspree endpoint es público por diseño, pero cualquier otro key) queda en el bundle.
- Tiempo: 20 min · Dificultad: baja · Riesgo: 🟢
- Archivos: búsqueda en todo el repo (`rg`), no se editan salvo hallazgo.
- Dependencias: ninguna.
- Resultado: informe corto en `docs/security.md`.

---

## FASE 2 — Cumplimiento RGPD reforzado (día 2–3)

Consolida cookies/privacidad y conecta consentimiento con analítica futura.

### 2.1 Consent Mode: bloquear scripts hasta aceptación
- Prioridad: **crítica** (si se planea añadir GA/Meta Pixel; alta si no)
- Por qué: hoy el banner guarda preferencia en `localStorage` pero no hay carga real de scripts que respetar. Antes de instalar analítica, se debe implementar el "gate".
- Tiempo: 2 h · Dificultad: media · Riesgo: 🟡
- Archivos: `src/components/CookieBanner.tsx`, nuevo `src/lib/consent.ts` (event bus), `src/routes/__root.tsx`.
- Dependencias: ninguna (habilita 4.1).
- Resultado: API `onConsent(kind)` que cargará GA/Pixel cuando exista consentimiento.

### 2.2 Reapertura de preferencias desde Footer
- Prioridad: media
- Por qué: RGPD exige poder retirar el consentimiento con la misma facilidad con la que se dio.
- Tiempo: 30 min · Dificultad: baja · Riesgo: 🟢
- Archivos: `src/components/Footer.tsx`, `src/components/CookieBanner.tsx` (exponer `openPreferences()`).
- Dependencias: 2.1.
- Resultado: enlace "Gestionar cookies" en el footer que reabre el banner.

### 2.3 Registro de versión de consentimiento
- Prioridad: media
- Por qué: si cambia la política, hay que volver a pedir consentimiento. Se guarda `version` junto al consent.
- Tiempo: 20 min · Dificultad: baja · Riesgo: 🟢
- Archivos: `src/components/CookieBanner.tsx`.
- Dependencias: 2.1.
- Resultado: al subir la versión, el banner reaparece automáticamente.

### 2.4 Revisión legal de textos de `/cookies` y `/privacidad`
- Prioridad: alta
- Por qué: los textos actuales son plantilla. Deben incluir responsable del tratamiento, DPO si aplica, base jurídica, plazos de conservación, derechos ARCO-POL y AEPD como autoridad.
- Tiempo: 1 h (redacción) · Dificultad: baja · Riesgo: 🟢
- Archivos: `src/i18n/translations.ts` (bloques ES/EN/IT).
- Dependencias: ninguna.
- Resultado: textos publicables tras revisión del cliente/abogado.

---

## FASE 3 — Robustez técnica (día 3–5)

### 3.1 `<html lang>` dinámico según idioma activo
- Prioridad: alta
- Por qué: hoy queda fijado a `es` en `__root.tsx` aunque el usuario cambie a EN/IT. Impacta SEO y accesibilidad.
- Tiempo: 45 min · Dificultad: media · Riesgo: 🟡 (hidratación).
- Archivos: `src/routes/__root.tsx`, `src/i18n/I18nProvider.tsx`.
- Dependencias: ninguna.
- Resultado: `<html lang="en|it|es">` coherente sin mismatch de hidratación.

### 3.2 Páginas 404 y 500 traducidas y con branding CLAB
- Prioridad: alta
- Por qué: hoy están en inglés y con estilo genérico shadcn.
- Tiempo: 1 h · Dificultad: baja · Riesgo: 🟢
- Archivos: `src/routes/__root.tsx`, `src/lib/error-page.ts`, `src/i18n/translations.ts`.
- Dependencias: 3.1.
- Resultado: 404/500 con logo, tipografía y copy CLAB en 3 idiomas.

### 3.3 `hreflang` y canonical alternos
- Prioridad: media
- Por qué: aunque el contenido se traduce por JS (misma URL), añadir `x-default` clarifica intención. Alternativa mayor: rutas `/en/...` y `/it/...`.
- Tiempo: 30 min (versión ligera) · Dificultad: baja · Riesgo: 🟢
- Archivos: `src/routes/__root.tsx`, `src/i18n/I18nProvider.tsx`.
- Dependencias: 3.1.
- Resultado: metaetiquetas `hreflang` correctas.

### 3.4 Auditoría de dependencias con `bun audit` / Snyk
- Prioridad: alta
- Por qué: detectar CVEs en `framer-motion`, `@formspree/react`, etc.
- Tiempo: 30 min · Dificultad: baja · Riesgo: 🟢
- Archivos: ninguno (o `package.json` si hay que actualizar).
- Dependencias: ninguna.
- Resultado: 0 vulnerabilidades altas/críticas.

### 3.5 Optimización de vídeos (BK.mp4 y showcase)
- Prioridad: media
- Por qué: peso de vídeo impacta LCP y CLS en móvil.
- Tiempo: 1 h (reencode H.264 + poster estático WebP) · Dificultad: baja · Riesgo: 🟡 (posible cambio de calidad visual).
- Archivos: `public/media/*`, `src/routes/index.tsx`.
- Dependencias: ninguna.
- Resultado: peso <2 MB por vídeo, Lighthouse Performance ≥ 90.

---

## FASE 4 — Observabilidad y analítica (día 5–6)

### 4.1 Integrar analítica respetuosa (Plausible o GA4 con Consent Mode v2)
- Prioridad: media
- Por qué: sin datos no se sabe qué convierte.
- Tiempo: 1 h · Dificultad: media · Riesgo: 🟡
- Archivos: `src/routes/__root.tsx`, `src/lib/consent.ts`.
- Dependencias: **2.1**.
- Resultado: métricas activadas solo con consentimiento.

### 4.2 Monitorización de errores (Sentry o similar)
- Prioridad: media
- Por qué: hoy `console.error` se pierde en producción edge.
- Tiempo: 1,5 h · Dificultad: media · Riesgo: 🟡
- Archivos: `src/lib/error-capture.ts`, `src/server.ts`.
- Dependencias: 1.1 (CSP debe permitir el endpoint).
- Resultado: alertas de errores 500 y JS del cliente.

---

## FASE 5 — Calidad de código y escalabilidad (semana 2)

### 5.1 Extraer `translations.ts` por idioma
- Prioridad: baja
- Por qué: archivo actual >600 líneas por idioma; dificulta mantenimiento y revisión.
- Tiempo: 1 h · Dificultad: baja · Riesgo: 🟡 (regresión textual si falla algún import).
- Archivos: `src/i18n/es.ts`, `en.ts`, `it.ts`, `translations.ts` (agregador).
- Dependencias: ninguna.
- Resultado: mismo comportamiento, mejor DX.

### 5.2 Tests mínimos: smoke + i18n keys
- Prioridad: media
- Por qué: evitar que un merge borre una key y rompa una página.
- Tiempo: 2 h · Dificultad: media · Riesgo: 🟢
- Archivos: `tests/i18n.test.ts`, `tests/routes.smoke.test.ts`.
- Dependencias: 5.1 recomendado.
- Resultado: CI que valida paridad de keys entre ES/EN/IT y que cada ruta renderiza.

### 5.3 CI (GitHub Actions): typecheck + build + audit
- Prioridad: media
- Por qué: bloquea merges rotos.
- Tiempo: 45 min · Dificultad: baja · Riesgo: 🟢
- Archivos: `.github/workflows/ci.yml`.
- Dependencias: 3.4, 5.2.
- Resultado: PRs con checks verdes obligatorios.

### 5.4 Accesibilidad (WCAG 2.1 AA)
- Prioridad: media
- Por qué: obligación de accesibilidad web pública en la UE (EAA 2025).
- Tiempo: 3 h · Dificultad: media · Riesgo: 🟡
- Archivos: componentes de Navbar, CookieBanner, formulario, focus rings.
- Dependencias: ninguna.
- Resultado: Lighthouse Accessibility ≥ 95, navegación por teclado completa.

### 5.5 Documentación técnica interna
- Prioridad: baja
- Por qué: onboarding y traspaso.
- Tiempo: 1,5 h · Dificultad: baja · Riesgo: 🟢
- Archivos: `README.md`, `docs/architecture.md`, `docs/i18n.md`, `docs/deploy.md`.
- Dependencias: fases 0–4.
- Resultado: proyecto autodocumentado.

---

## Ruta crítica sugerida

```text
Fase 0 (legal repo) ─┐
                     ├─► Fase 1 (seguridad HTTP) ─► Fase 2 (RGPD reforzado) ─► Fase 4.1 (analítica)
Fase 3.1 (lang)      ┘                                                      └─► Fase 4.2 (Sentry)
                       Fase 3.2/3.3 (errores + hreflang)
                       Fase 3.4 (audit) ─► Fase 5.3 (CI)
                       Fase 3.5 (media) ─► Fase 5.4 (a11y)
                       Fase 5.1 (i18n split) ─► Fase 5.2 (tests)
```

---

## Resumen de riesgo agregado por fase

| Fase | Impacto de negocio | Riesgo de rotura | Duración |
| --- | --- | --- | --- |
| 0 — Legal repo | Alto (auditoría/venta) | 🟢 | 1 h |
| 1 — Seguridad HTTP | Alto (compliance) | 🟡 (CSP) | 2 h |
| 2 — RGPD reforzado | Alto (multas AEPD) | 🟡 | 4 h |
| 3 — Robustez | Medio (SEO, UX) | 🟡 | 4 h |
| 4 — Observabilidad | Medio (decisiones) | 🟡 | 2,5 h |
| 5 — Calidad | Medio-largo plazo | 🟡 | 8 h |

**Duración total estimada:** ~21 h de trabajo (2 sprints de 1 semana a media dedicación).

---

## Notas técnicas para el Tech Lead

- Ningún cambio requiere migración de datos ni de dominio.
- Todos los despliegues son atómicos (Cloudflare Worker) → rollback = redeploy previo.
- CSP (1.1) es el único punto donde recomiendo fase de "Report-Only" 48 h antes de enforce.
- Antes de iniciar la Fase 3.5 (vídeos) conviene tener 4.1 (analítica) para medir el impacto real en LCP.
- La Fase 5.1 (split de i18n) debe hacerse antes de que el `translations.ts` crezca más, pero después de las Fases 2 y 3.2 que aún añaden claves.

Dime por qué fase quieres empezar y arranco con las tareas correspondientes.