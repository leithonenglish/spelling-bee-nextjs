'use client';
import { useMemo } from 'react';
import { AnimationResult, animated, useTransition } from '@react-spring/web';
import { AnswerStatus } from '@/types';
import clsx from 'clsx';

type ToastProps = {
  status?: AnswerStatus | null;
  points: number | null;
  onDone: () => void;
};

const Toast = ({ status, points, onDone }: ToastProps) => {
  const isError = useMemo(
    () => !status || (status && status < AnswerStatus.GOOD),
    [status]
  );

  const messageTransition = useTransition(status, {
    from: { opacity: 0, y: 0 },
    enter: { opacity: 1, y: -30 },
    leave: { opacity: 0, y: -10 },
    onRest(result: AnimationResult) {
      if (!points && result.finished && (result.value as any).opacity === 1) {
        onDone();
      }
    },
  });

  const pointsTransition = useTransition(points, {
    delay: 100,
    from: { opacity: 0, y: 5, x: 5 },
    enter: { opacity: 1, y: -5 },
    leave: { opacity: 1, y: 0 },
    onRest(result: AnimationResult) {
      if (result.finished && (result.value as any).opacity === 1) {
        onDone();
      }
    },
  });

  const messages = {
    [AnswerStatus.EMPTY]: `No word entered`,
    [AnswerStatus.ALREADY_FOUND]: `Already found`,
    [AnswerStatus.MISSING_CENTER]: `Missing center word`,
    [AnswerStatus.BAD_WORD]: `Bad Letters`,
    [AnswerStatus.TOO_SHORT]: `Too short`,
    [AnswerStatus.TOO_LONG]: `Too long`,
    [AnswerStatus.NOT_A_WORD]: `Not a word`,
    [AnswerStatus.GOOD]: `Good!`,
    [AnswerStatus.GREAT]: `Great!`,
    [AnswerStatus.AWESOME]: `Awesome!`,
    [AnswerStatus.PANGRAM]: `Pangram!`,
    [AnswerStatus.WOW]: `WOW!`,
    [AnswerStatus.OMG]: `OMG!`,
  };

  return messageTransition(
    (styles, value) =>
      !!value && (
        <animated.div className='relative' style={styles}>
          <span
            className={clsx([
              'whitespace-nowrap rounded px-3 py-2 text-sm font-light text-white shadow-md',
              isError ? 'bg-slate-800' : 'bg-emerald-500',
            ])}
          >
            {messages[value]}
          </span>
          {pointsTransition(
            (pstyle, pvalue) =>
              pvalue && (
                <animated.span
                  className='absolute left-full font-light'
                  style={pstyle}
                >
                  +{points}
                </animated.span>
              )
          )}
        </animated.div>
      )
  );
};

export default Toast;
