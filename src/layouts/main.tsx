import Head from "next/head";
import Header from "src/components/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <Head>
        <title>Spelling Bee | Leithon English</title>
        <meta
          name="description"
          content="A NY Spelling Bee Clone by Leithon English"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
