export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>CLAB — Error</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        font: 15px/1.5 "Space Grotesk", system-ui, -apple-system, sans-serif;
        background: #000; color: #fff;
        display: grid; place-items: center; min-height: 100vh; padding: 1.5rem;
        -webkit-font-smoothing: antialiased;
      }
      .card { max-width: 34rem; width: 100%; text-align: center; padding: 2rem; }
      .brand { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 2rem; }
      h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; letter-spacing: -0.02em; margin: 0 0 1rem; text-transform: uppercase; }
      p { color: rgba(255,255,255,0.7); margin: 0 0 2rem; font-size: 1rem; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button {
        padding: 0.85rem 1.75rem; font: inherit; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; font-size: 12px;
        cursor: pointer; text-decoration: none; border: 1px solid #fff; transition: background 0.15s, color 0.15s;
      }
      .primary { background: #fff; color: #000; }
      .primary:hover { background: rgba(255,255,255,0.85); }
      .secondary { background: transparent; color: #fff; }
      .secondary:hover { background: #fff; color: #000; }
    </style>
  </head>
  <body>
    <main class="card">
      <div class="brand">In The CLAB</div>
      <h1>Algo no ha cargado bien</h1>
      <p>Ha ocurrido un error en nuestro lado. Puedes reintentar o volver al inicio.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Reintentar</button>
        <a class="secondary" href="/">Ir al inicio</a>
      </div>
    </main>
  </body>
</html>`;
}
