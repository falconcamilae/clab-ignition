# Seguridad — Proyecto CLAB

## Revisión de secretos en el repositorio (Fase 1.3)

Búsqueda ejecutada:

```
rg -n --hidden -g '!node_modules' -g '!bun.lock*' -g '!.git' \
   -e 'sk_live|sk_test|SECRET|API_KEY|PRIVATE_KEY|BEGIN RSA|BEGIN PRIVATE|Bearer [A-Za-z0-9]{20}|token=|password='
```

Resultado: **0 coincidencias**. No hay credenciales privadas embebidas en el
código. El único identificador de terceros presente es el endpoint público
de Formspree (`mlgvddrz`), que por diseño es un valor público (equivalente
a un `form action` URL) y no da acceso a datos del buzón.

## Cabeceras de seguridad HTTP (Fase 1.1)

Se aplican en `src/lib/security-headers.ts` desde `src/server.ts` a toda
respuesta que sirve el Worker de Cloudflare.

| Header | Valor | Modo |
| --- | --- | --- |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | enforce |
| X-Content-Type-Options | `nosniff` | enforce |
| X-Frame-Options | `DENY` | enforce |
| Referrer-Policy | `strict-origin-when-cross-origin` | enforce |
| Permissions-Policy | camera/mic/geo/payment/usb/... `()` | enforce |
| Cross-Origin-Opener-Policy | `same-origin` | enforce |
| Cross-Origin-Resource-Policy | `same-origin` | enforce |
| Content-Security-Policy | allowlist Google Fonts + Formspree | **Report-Only** |

La CSP se envía en `Report-Only` durante la fase de rodaje. Cuando se
verifique en producción que no hay reportes, cambiar la clave del header
a `Content-Security-Policy` en `security-headers.ts` para pasar a enforce.

## Formulario de contacto (Fase 1.2)

Se añadió honeypot `_gotcha` en `src/routes/contacto.tsx`. Formspree
descarta automáticamente cualquier envío en el que ese campo llegue con
valor, reduciendo spam sin degradar UX ni accesibilidad (campo fuera de
pantalla y con `aria-hidden`).
