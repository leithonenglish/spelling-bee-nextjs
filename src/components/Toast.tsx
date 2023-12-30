'use client';
import { useMemo } from 'react';
import { animated, useSpring } from 'react-spring';
import { AnswerStatus } from '@/types';

type ToastProps = {
  status: AnswerStatus;
  points: number | null;
  onDone: () => void;
};

const Toast = ({ status, points, onDone }: ToastProps) => {
  const isError = useMemo(() => status < AnswerStatus.GOOD, [status]);

  const messageAnimationStyle = useSpring({
    to: [
      { opacity: 1, y: -30 },
      { opacity: 0, y: -10 },
    ],
    from: { opacity: 1, y: 0 },
  });

  const pointsAnimationStyle = useSpring({
    delay: 100,
    to: [
      { opacity: 1, y: -5 },
      { opacity: 0, y: 0 },
    ],
    from: { opacity: 1, y: 5, x: 5 },
    onResolve(result) {
      if (result.finished) {
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

  return (
    <animated.div className='relative' style={messageAnimationStyle}>
      <span
        className={`whitespace-nowrap rounded px-3 py-2 text-sm font-light text-white shadow-md ${
          isError ? 'bg-slate-800' : 'bg-emerald-500'
        }`}
      >
        {messages[status]}
      </span>
      {points && (
        <animated.span
          className='absolute left-full font-light'
          style={pointsAnimationStyle}
        >
          +{points}
        </animated.span>
      )}
    </animated.div>
  );
};

export default Toast;
