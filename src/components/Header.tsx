import Link from "next/link";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-300 mb-3">
        <div className="flex gap-2 w-full md:w-auto">
          <Hamburger toggled={isOpen} toggle={setOpen} size={22} />
          <div className="flex-auto flex justify-center items-center gap-[5px]">
            <span className="font-display font-bold text-3xl">LE</span>
            <span className="border-l border-slate-400 h-5 mt-1 md:border-l-2"></span>
            <span className="font-zillaSlab font-bold text-3xl tracking-[-0.5px]">
              Games
            </span>
          </div>
        </div>
        <div className="hidden justify-between p-4 gap-2 md:flex">
          <Link href="/sign-up">
            <a className="uppercase font-bold text-[11px] text-center text-white tracking-[0.09em] py-[8px] px-8 rounded-[3px] border border-black bg-black transition-colors hover:bg-slate-700">
              Sign Up
            </a>
          </Link>
          <Link href="/sign-up">
            <a className="uppercase font-bold text-[11px] text-center tracking-[0.09em] py-[8px] px-8 rounded-[3px] border border-black bg-white transition-colors hover:bg-black hover:text-white">
              Log In
            </a>
          </Link>
        </div>
      </div>
      <div className="w-full border-b border-slate-300 p-6">
        <div className="flex flex-col gap-2 w-full h-full max-w-[1080px] mx-auto">
          <h1 className="text-5xl font-zillaSlab font-bold">Spelling Bee</h1>
          <h2 className="text-sm text-black font-light">
            Edited by Leithon English
          </h2>
        </div>
      </div>
    </>
  );
};

export default Header;
