'use client';
import { memo, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { CollectedWord } from '@/types';

type WordListProps = {
  words: Array<CollectedWord>;
};

const WordList = memo(({ words }: WordListProps) => {
  const [open, setOpen] = useState(false);
  const wordTransitions = useTransition(words, {
    from: { opacity: 0, x: -30 },
    enter: { opacity: 1, x: 0 },
  });
  return (
    <div
      className={clsx(
        'relative z-10 flex-auto border border-gray-300 p-3 md:overflow-auto md:rounded md:p-5',
        { 'rounded-t': open, rounded: !open }
      )}
    >
      {words.length > 0 ? (
        <>
          <div
            className='-m-5 flex items-center justify-between gap-1 p-5 md:hidden'
            onClick={() => setOpen(!open)}
          >
            <div className='relative flex w-full gap-2 overflow-hidden text-sm font-thin'>
              {wordTransitions((styles, word) => (
                <animated.span style={styles} key={word.text}>
                  {word.text}
                </animated.span>
              ))}
              <div className='absolute right-0 top-0 h-full w-[10%] bg-white/90'></div>
            </div>
            <Icon
              icon='ph:caret-down-bold'
              className={clsx('transform text-xl transition-transform', {
                'rotate-180': open,
                'rotate-0': !open,
              })}
            />
          </div>
          <ul
            className={clsx(
              'absolute left-[-1px] right-[-1px] top-[44px] flex-col gap-3 rounded-b border border-gray-300 bg-white p-5 transition-[height,opacity] md:relative md:left-auto md:right-auto md:top-auto md:flex md:h-auto md:border-none md:p-0 md:opacity-100',
              {
                'h-[65vh] overflow-auto opacity-100': open,
                'h-0 overflow-hidden opacity-0': !open,
              }
            )}
          >
            {words.map(({ text, points }) => {
              return (
                <li
                  key={text}
                  className='flex items-center justify-between border-b border-gray-200 pb-3 pt-3 first:pt-0 last:border-b-0 last:pb-0 md:pt-0'
                >
                  <span className='font-bold tracking-wide text-slate-700'>
                    {text}
                  </span>
                  <span className='rounded bg-emerald-500 px-2 py-[2px] text-sm font-bold text-white'>
                    +{points}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className='text-center text-sm font-thin'>
          You haven&apos;t collected any words yet.
        </p>
      )}
    </div>
  );
});

WordList.displayName = 'WordList';

export default WordList;
