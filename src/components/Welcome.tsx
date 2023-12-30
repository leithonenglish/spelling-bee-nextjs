'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  useSpring,
  animated,
  easings,
  useSpringRef,
  useChain,
} from '@react-spring/web';
import clsx from 'clsx';
import { useComb } from '@/context/comb';
import { CollectedWord, StorageName } from '@/types';

const Welcome = () => {
  const { reset } = useComb();
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);
  const [continuing, setContinuing] = useState(false);
  const [message, setMessage] = useState('');

  const fadeInUpSpring = {
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 100 },
    config: { duration: 300, easing: easings.easeInOutQuad },
  };

  const mainStyleProps = useSpring({
    opacity: open ? 1 : 0,
    y: open ? 0 : window.innerHeight,
    config: { duration: 300 },
    onRest: () => {
      setVisible(false);
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    },
  });

  const spring1Ref = useSpringRef();
  const spring1 = useSpring({
    ...fadeInUpSpring,
    ref: spring1Ref,
  });

  const spring2Ref = useSpringRef();
  const spring2 = useSpring({
    ...fadeInUpSpring,
    ref: spring1Ref,
  });

  const spring3Ref = useSpringRef();
  const spring3 = useSpring({
    ...fadeInUpSpring,
    ref: spring1Ref,
  });

  const spring4Ref = useSpringRef();
  const spring4 = useSpring({
    ...fadeInUpSpring,
    ref: spring1Ref,
  });

  useChain(
    [spring1Ref, spring2Ref, spring3Ref, spring4Ref],
    [0, 0.33, 0.66, 1],
    2000
  );

  const resetGame = () => {
    reset();
    setOpen(false);
  };

  useEffect(() => {
    if (loaded) {
      const words: Array<CollectedWord> = JSON.parse(
        localStorage.getItem(StorageName.COLLECTED_WORD) ?? '[]'
      );
      if (words.length > 0) {
        setContinuing(true);
        setMessage(
          `You've found ${words.length} word${words.length > 1 ? 's' : ''}`
        );
      } else {
        setMessage('How many words can you make with 7 letters?');
      }
      setMounted(true);
    } else {
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <animated.div
      className={clsx(
        'absolute bottom-0 left-0 top-[-1px] z-50 w-full bg-dandelion p-8 transition-transform md:p-10',
        {
          'md:pt-40': !continuing,
          'pt-10': continuing,
          hidden: !visible,
        }
      )}
      style={mainStyleProps}
    >
      {mounted && (
        <div
          className={clsx([
            'mx-auto flex max-w-xl flex-col items-center lg:max-w-none',
            {
              'gap-5': !continuing,
              'gap-10 md:gap-40': continuing,
            },
          ])}
        >
          <animated.div
            className={clsx([
              'flex flex-col items-center justify-center',
              {
                'gap-4': !continuing,
                'gap-2': continuing,
              },
            ])}
            style={spring1}
          >
            <Image
              alt='bee'
              src='/bee-icon.svg'
              height={continuing ? 72 : 100}
              width={continuing ? 72 : 100}
              priority
            />
            <h1
              className={clsx([
                'text-center font-zillaSlab font-bold',
                {
                  'text-5xl md:text-6xl': !continuing,
                  'text-3xl': continuing,
                },
              ])}
            >
              Spelling Bee
            </h1>
          </animated.div>
          <div className='flex flex-col items-center justify-center gap-8'>
            <animated.div className='flex flex-col gap-2' style={spring2}>
              {continuing && (
                <h1 className='text-center font-slab text-3xl font-bold md:text-4xl'>
                  Welcome Back
                </h1>
              )}
              <p className='text-center font-slab text-2xl opacity-90 md:text-3xl'>
                {message}
              </p>
            </animated.div>
            <animated.div
              className='flex w-56 flex-col gap-3 md:w-auto md:flex-row md:gap-5'
              style={spring3}
            >
              {continuing && (
                <button
                  className='order-2 h-12 min-w-[9.375rem] rounded-[1.5rem] border border-black bg-transparent font-bold transition-[background,transform] hover:scale-95 hover:cursor-pointer hover:bg-opacity-90 md:order-1'
                  onClick={resetGame}
                >
                  Start Over
                </button>
              )}
              <button
                className='order-1 h-12 min-w-[9.375rem] rounded-[1.5rem] bg-black font-bold text-white transition-[background,transform] hover:scale-95 hover:cursor-pointer hover:bg-opacity-90 md:order-2'
                onClick={() => setOpen(false)}
              >
                {continuing ? 'Continue' : 'Play'}
              </button>
            </animated.div>
            <animated.p className='text-center font-light' style={spring4}>
              Edited by Leithon English
            </animated.p>
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default Welcome;
