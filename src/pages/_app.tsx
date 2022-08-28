// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import type { AppRouter } from "../server/router";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter";
import "@fontsource/inter/700.css";
import "@fontsource/hepta-slab/500.css";
import "@fontsource/hepta-slab/700.css";
import "../styles/globals.css";
import { CombProvider } from "src/context/word";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CombProvider>
        <Head>
          <title>Spelling Bee | Leithon English</title>
          <meta
            name="description"
            content="A NY Spelling Bee Clone by Leithon English"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col h-full">
          <div className="w-full border-b border-slate-300 p-6">
            <div className="flex flex-col gap-2 w-full h-full max-w-[1080px] mx-auto">
              <h1 className="text-4xl font-slab font-bold">Spelling Bee</h1>
              <h2 className="text-sm text-slate-700 font-light">
                Edited by Leithon English
              </h2>
            </div>
          </div>
          <div className="relative flex-auto flex">
            <Component {...pageProps} />
          </div>
        </div>
      </CombProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
