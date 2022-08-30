declare module "next-layout" {
  type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
    P,
    IP
  > & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };
}
