import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { Squash as Hamburger } from "hamburger-react";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const styles = useSpring({
    x: isOpen ? 0 : -400,
  });
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const elm = event.target as HTMLDivElement;
      const hamburgerElm = document.querySelector(".hamburger-react");
      if (
        isOpen &&
        hamburgerElm !== elm &&
        !hamburgerElm?.contains(elm) &&
        sidebarRef.current &&
        !sidebarRef.current.contains(elm)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, isOpen]);
  return (
    <>
      <div className="sticky top-0 z-[52] flex justify-between items-center border-b border-gray-300 bg-white mb-3">
        <div className="flex gap-2 w-full md:w-auto">
          <Hamburger toggled={isOpen} toggle={setOpen} size={22} />
          <div className="flex-auto flex justify-center items-center gap-[5px] ml-[-48px]">
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
      <animated.div
        ref={sidebarRef}
        className="fixed z-[51] flex flex-col top-[48px] left-0 bottom-0 w-full bg-white md:top-[67.5px] xs:w-[350px] border-r border-slate-300 shadow-[rgba(0,0,0,0.08)_3px_0px_5px]"
        style={styles}
      >
        <div className="flex flex-col flex-auto gap-4 p-4 overflow-auto">
          <h1 className="font-slab font-medium">A note from the Developer</h1>
          <div className="flex flex-col gap-3 font-light">
            <p>
              Hi 👋🏼. My name is Leithon (Lee-thon) English, and I write
              software. I made this app on a whim, but it turned out to be
              really fun, and I hope you like it. The technologies I chose for
              this build are:
            </p>
            <ul className="marker:text-amber-400 list-disc pl-4">
              <li>NextJs</li>
              <li>Prisma</li>
              <li>tRPC</li>
              <li>TailwindCss</li>
            </ul>
            <p>
              Essentially I used the{" "}
              <span className="font-bold text-violet-600">T3 Stack</span> from
              the{" "}
              <a
                href="https://create.t3.gg"
                className="text-blue-600 underline"
              >
                Create T3 App
              </a>{" "}
              Template.
            </p>
            <p>
              I&apos;ll be making more stuff like this in the future. Be sure to
              check out my website{" "}
              <a
                className="text-blue-600 underline"
                href="https://leithonenglish.me"
              >
                leithonenglish.me
              </a>{" "}
              or my{" "}
              <a
                className="text-blue-600 underline"
                href="https://github.com/leithonenglish"
              >
                Github
              </a>
              .
            </p>
            <p>
              And special thanks to The NY Times Spelling Bee. Couldn&apos;t
              have done this without them.
            </p>
          </div>
        </div>
        <div className="flex flex-shrink-0 justify-evenly p-4 gap-4">
          <Link href="/sign-up">
            <a className="uppercase font-bold text-[11px] text-center text-white tracking-[0.09em] py-3 px-8 w-full rounded-[3px] border border-black bg-black transition-colors hover:bg-slate-700">
              Sign Up
            </a>
          </Link>
          <Link href="/sign-up">
            <a className="uppercase font-bold text-[11px] text-center tracking-[0.09em] py-3 px-8 w-full rounded-[3px] border border-black bg-white transition-colors hover:bg-black hover:text-white">
              Log In
            </a>
          </Link>
        </div>
      </animated.div>
    </>
  );
};

export default Header;
