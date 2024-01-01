'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Squash as Hamburger } from 'hamburger-react';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const styles = useSpring({
    x: isOpen ? '0%' : '-110%',
  });
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const elm = event.target as HTMLDivElement;
      const hamburgerElm = document.querySelector('.hamburger-react');
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef, isOpen]);
  return (
    <>
      <div className='sticky top-0 z-[52] mb-3 flex items-center justify-between border-b border-gray-300 bg-white'>
        <div className='flex w-full gap-2 md:w-auto'>
          <Hamburger toggled={isOpen} toggle={setOpen} size={22} />
          <Link
            href='/'
            className='ml-[-48px] flex flex-auto items-center justify-center gap-[5px] md:ml-0'
          >
            <span className='font-display text-3xl font-bold'>LE</span>
            <span className='mt-1 h-5 border-l border-slate-400 md:border-l-2'></span>
            <span className='font-zillaSlab text-3xl font-bold tracking-[-0.5px]'>
              Games
            </span>
          </Link>
        </div>
        <div className='hidden justify-between gap-2 p-4 md:flex'>
          <Link
            href='/sign-up'
            className='rounded-[3px] border border-black bg-black px-8 py-[8px] text-center text-[11px] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:bg-slate-800'
          >
            Sign Up
          </Link>
          <Link
            href='/login'
            className='rounded-[3px] border border-black bg-white px-8 py-[8px] text-center text-[11px] font-bold uppercase tracking-[0.09em] transition-colors hover:bg-black hover:text-white'
          >
            Log In
          </Link>
        </div>
      </div>
      <animated.div
        ref={sidebarRef}
        className='fixed bottom-0 left-0 top-[48px] z-[51] flex w-[95%] flex-col border-r border-slate-300 bg-white shadow-[rgba(0,0,0,0.08)_3px_0px_5px] md:top-[67.5px] md:w-[350px]'
        style={styles}
      >
        <div className='flex flex-auto flex-col gap-4 overflow-auto p-4'>
          <h1 className='font-slab font-medium'>A note from the Developer</h1>
          <div className='flex flex-col gap-3 font-light'>
            <p>
              Hi 👋🏼. My name is Leithon (Lee-thon) English, and I write
              software. I made this app on a whim, but it turned out to be
              really fun, and I hope you like it. The technologies I chose for
              this build are:
            </p>
            <ul className='list-disc pl-4 marker:text-amber-400'>
              <li>NextJs</li>
              <li>TanStack Query</li>
              <li>React Spring</li>
              <li>TailwindCSS</li>
            </ul>
            <p>
              I&apos;ll be making more stuff like this in the future. Be sure to
              check out my website{' '}
              <a
                className='text-blue-600 underline'
                href='https://leithonenglish.me'
              >
                leithonenglish.me
              </a>{' '}
              or my{' '}
              <a
                className='text-blue-600 underline'
                href='https://github.com/leithonenglish'
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
        <div className='flex flex-shrink-0 justify-evenly gap-4 p-4 md:hidden'>
          <Link
            href='/sign-up'
            className='w-full rounded-[3px] border border-black bg-black px-8 py-3 text-center text-[11px] font-bold uppercase tracking-[0.09em] text-white transition-colors hover:bg-slate-800'
          >
            Sign Up
          </Link>
          <Link
            href='/login'
            className='w-full rounded-[3px] border border-black bg-white px-8 py-3 text-center text-[11px] font-bold uppercase tracking-[0.09em] transition-colors hover:bg-black hover:text-white'
          >
            Log In
          </Link>
        </div>
      </animated.div>
    </>
  );
};

export default Header;
