import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { Toaster } from "@/components/ui/sonner";
import { I18nProvider, useI18n } from "@/i18n/I18nProvider";
import { CookieBanner } from "@/components/CookieBanner";
import { initConsentDefaults } from "@/lib/consent";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-dvh items-center justify-center bg-black text-white px-5">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">In The CLAB</p>
        <h1 className="mt-6 text-7xl md:text-8xl font-bold tracking-tight">404</h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-bold uppercase tracking-tight">
          {t<string>("errors.notFoundTitle")}
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/70">
          {t<string>("errors.notFoundBody")}
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center bg-white text-black px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white/90 transition"
          >
            {t<string>("errors.notFoundBack")}
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useI18n();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-black text-white px-5">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">In The CLAB</p>
        <h1 className="mt-6 text-2xl md:text-3xl font-bold uppercase tracking-tight">
          {t<string>("errors.genericTitle")}
        </h1>
        <p className="mt-3 text-sm md:text-base text-white/70">
          {t<string>("errors.genericBody")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-white text-black px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white/90 transition"
          >
            {t<string>("errors.retry")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-white text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition"
          >
            {t<string>("errors.home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "In The CLAB" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "In The CLAB" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <I18nProvider>
      <NotFoundComponent />
    </I18nProvider>
  ),
  errorComponent: (props) => (
    <I18nProvider>
      <ErrorComponent {...props} />
    </I18nProvider>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    initConsentDefaults();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Outlet />
        <CookieBanner />
        <Toaster position="bottom-right" theme="dark" />
      </I18nProvider>
    </QueryClientProvider>
  );
}
