import Link from "next/link";
import { NextPageWithLayout } from "next-layout";
import { ReactElement } from "react";
import MainLayout from "src/layouts/main";
import Image from "next/image";

const Custom404: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative flex items-center justify-center px-10 mt-[5%]">
        <span className="text-[clamp(5rem,24vw+1rem,15rem)] font-bold">4</span>
        <svg
          viewBox="0 0 120 103.92304845413263"
          className="h-[clamp(5rem,21vw+1rem,13rem)] text-center"
        >
          <polygon
            className="fill-amber-300"
            points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
            stroke="white"
            strokeWidth="7.5"
          ></polygon>
        </svg>
        <span className="text-[clamp(5rem,24vw+1rem,15rem)] font-bold">4</span>
        <div className="absolute top-[12%] ml-[10%] h-[clamp(2rem,10vw+1rem,3rem)] w-[clamp(2rem,10vw+1rem,3rem)]">
          <Image src="/bee.png" layout="fill" alt="bee" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl text-slate-700 font-light text-center">
          It seems you have strayed from the hive!
        </p>
        <Link href="/">
          <a className="mx-auto text-2xl font-zillaSlab text-amber-400 underline">
            Head back home
          </a>
        </Link>
      </div>
    </div>
  );
};

Custom404.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Custom404;
