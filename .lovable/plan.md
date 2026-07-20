## Enfoque

Reposicionar CLAB como **agencia boutique de marketing deportivo especializada** trabajando exclusivamente sobre `src/i18n/translations.ts` (ES/EN/IT) y, cuando sea imprescindible para la jerarquía, sobre el orden de secciones ya existentes en las rutas. Cero cambios en componentes visuales, colores, tipografía, layout, navegación o dependencias. Cero datos inventados.

## Principios de escritura (aplican a todo el proyecto)

- Conservar la voz actual: frases cortas, punto seco, algún fragmento en cursiva, tono sobrio, sin superlativos publicitarios.
- Sustituir "hacemos todo lo que un club necesita" por lenguaje de **criterio, método y foco en deporte**.
- Antes de cada lista de entregables, una frase que explique el **porqué estratégico**, no el qué.
- Cada CTA responde a una pregunta implícita del lector, no a una fórmula ("Solicita una reunión", "Hablemos de tu club", "Ver método de trabajo").
- Nada de números, clientes, premios o testimonios que no existan.

## Fase 1 — Diagnóstico congelado (sin cambios)

Recorrido interno bloque por bloque anotando qué frase concreta suena a "agencia generalista" o rompe posicionamiento. Salida: lista corta de strings de `translations.ts` a reescribir en Fase 2–5. No se toca código todavía.

## Fase 2 — Home (posicionamiento y jerarquía del mensaje)

Solo strings dentro de `home.*` en los tres idiomas.

- **Hero**: reescribir `heroLabel`, `heroTitle1..4`, `ctaPlan`, `ctaServices` para que el visitante entienda en 2 segundos: agencia de marketing **solo deporte**, boutique, con criterio. Mantener la estructura tipográfica de 4 líneas.
- **Manifesto**: `manifesto` afinado hacia especialización/criterio; sin cambiar el tono contundente actual.
- **Services (home)**: `servicesLabel`, `servicesTitle` y los 4 `home.services[].d` — cada descripción abre con propósito estratégico antes del entregable.
- **Video showcase**: `videoLabel`, `videoTitle1/2` reencuadrados como **"Lenguaje visual"** o **"Nuestra mirada"** en lugar de "Proyectos" (evita insinuar cartera de clientes inexistente). El label debajo de cada vídeo (`Proyecto · 0X`, hoy hardcodeado en `index.tsx`) se mueve a `translations.ts` como etiqueta neutra (p.ej. "Pieza · 01") — cambio mínimo, aislado.
- **Plans**: `plansLabel`, `plansTitle`, `plansSubtext`, `planCta` — encuadrar los planes como **niveles de implicación**, no como paquetes.
- **Quote y CTA final**: `quote`, `ctaTitle1/2`, `ctaBtn` reescritos hacia "reunión / conversación" en lugar de "empezar".

Verificación: navegar Home en ES/EN/IT, comprobar que no hay strings vacíos, que la tipografía respira igual (longitudes similares a las actuales), y que ninguna clave nueva se ha introducido sin traducción en los tres idiomas.

## Fase 3 — Servicios (de catálogo a método)

Solo strings `servicios.*`.

- **Titular** (`servicios.title1/title2`, `servicios.label`): eliminar cualquier lectura de "todo lo que un club necesita". Reencuadrar como **áreas de trabajo con criterio deportivo**.
- **`servicios.services[].d`**: cada bloque abre con 1–2 frases de **valor estratégico** (por qué este servicio importa a un club/marca deportiva) antes del listado de `items`.
- **`servicios.services[].items[].d`**: reescribir para que cada entregable se lea como decisión, no como tarea.
- **CTA final** (`ctaTitle`, `ctaBtn`): orientado a **conversación**, no a venta.

Verificación: abrir/cerrar acordeón en las 4 áreas × 3 idiomas, comprobar altura estable y que ningún texto desborda las cards.

## Fase 4 — Planes (implicación, no entregables)

Solo strings `planes.*`.

- Reordenar el copy de cada `planes.list[]` para que empiece por **nivel de implicación / momento del club** y termine con entregables. Los `items` permanecen (son compromiso contractual) pero se anteponen 1–2 frases de contexto en `d`.
- `planes.lead` y `planes.title1/title2`: reforzar el "método" — cada plan es una forma de trabajar con CLAB, no una tarifa.
- `planes.ctaBtn`: "Solicitar reunión" / "Hablemos" según idioma.
- Mantener precios y `+ IVA` tal cual.

Verificación: los tres planes conservan misma altura visual; el destacado central (Middle) sigue siendo el ancla.

## Fase 5 — Nosotros (mensajes diferenciadores hacia arriba)

- Identificar en `nosotros.paragraphs` las frases que explican **por qué CLAB es solo deporte** y por qué eso importa.
- Reubicar las 1–2 más potentes como fuente para los nuevos textos de Home (Fase 2) y Servicios (Fase 3), **sin borrarlas de Nosotros** — quedan como desarrollo largo. Nosotros pasa de "presentación" a "profundización del posicionamiento ya visto".
- Afinar `nosotros.heading1/2`, `values[]` y `ctaTitle` para que refuercen criterio y foco, no biografía.

Verificación: leer Nosotros después de Home y Servicios; debe sonar como continuación, no como repetición.

## Fase 6 — Contacto y microcopy transversal

- `contacto.*`: encuadrar el formulario como **inicio de una conversación de trabajo**, no como "envíanos un mensaje". Placeholder y labels revisados en los tres idiomas. Mensaje de éxito ajustado al tono.
- Footer tagline (`footer.tag*` si existen): revisión ligera para que la última impresión refuerce especialización.
- CTAs de Navbar si aplica (probablemente ya OK).

Verificación: enviar formulario en modo test (honeypot vacío), comprobar mensaje de éxito en 3 idiomas.

## Fase 7 — Validación final

- `tsgo` limpio.
- Recorrido manual Home → Servicios → Planes → Nosotros → Contacto en ES, EN, IT.
- Comprobar que no se ha añadido ni removido ninguna key sin equivalente en los tres idiomas.
- Confirmar que el hero video, showcase de vídeos, banner de cookies, cabeceras de seguridad de Fase 1 y consent mode de Fase 2 siguen intactos.
- Nota corta en `docs/security.md` (o nuevo `docs/copy.md`) describiendo la revisión editorial hecha, para trazabilidad.

## Fuera de alcance (explícito)

- No se añade prueba social (logos, testimonios, cifras, casos).
- No se cambia layout, colores, fuentes, componentes, ni se instalan dependencias.
- No se refactoriza `translations.ts` (split por dominio queda para futura fase).
- No se tocan rutas nuevas ni navegación.
- No se toca el video del hero ni el showcase (solo la etiqueta neutra bajo cada clip).

## Detalle técnico

- Todos los cambios ES/EN/IT se hacen en el mismo archivo `src/i18n/translations.ts` con búsqueda-reemplazo bloque a bloque para minimizar riesgo de romper la estructura de objetos (recordar el brace mismatch previo).
- Nuevas keys se añaden en las tres lenguas simultáneamente antes de referenciarlas desde componentes.
- Si una key requiere aparecer en un componente que hoy la tiene hardcodeada (caso concreto: `Proyecto · 0X` en `src/routes/index.tsx`), se sustituye por `t()` en un solo edit puntual, sin tocar clases ni estructura JSX.
- Después de cada fase: `tsgo` + revisión visual en preview antes de pasar a la siguiente.

## Confirmación antes de arrancar

Si estás de acuerdo con este enfoque, arranco por la **Fase 1 (diagnóstico congelado)** y te devuelvo la lista exacta de strings a reescribir para tu visto bueno antes de tocar Home en Fase 2. Así conservamos el criterio en tus manos en cada paso.
