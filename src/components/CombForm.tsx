'use client';
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import { animated, useSpring, useTransition } from 'react-spring';
import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnswerStatus } from '@/types';
import { Icon } from '@iconify/react';
import Lottie from 'lottie-react';
import loadingBeeAnimation from '@/data/loading-bee.json';
import { useComb } from '@/context/comb';
import HighlightedInput from './HighlightedInput';
import ProgressBar from './ProgressBar';
import WordList from './WordList';
import Hive from './Hive';
import Toast from './Toast';

export default function CombForm() {
  const {
    status,
    cells,
    core,
    answerCount,
    collectedWords,
    setup,
    reset,
    shuffle,
    updateCollection,
  } = useComb();
  const [loaded, setLoaded] = useState(false);
  const [toasting, setToasting] = useState(false);
  const [typedLetter, setTypedLetter] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus | null>(null);
  const [answerPoints, setAnswerPoints] = useState<number | null>(null);
  const progress = useMemo(
    () => (collectedWords.length / answerCount) * 100,
    [collectedWords, answerCount]
  );

  const checkAnswerMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch('/api', {
          method: 'POST',
          body: JSON.stringify({ cells, core, word: answer }),
        });
        const data = (await response.json()) as boolean;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess(isAnswer) {
      if (isAnswer) {
        const points = answerStatus === AnswerStatus.OMG ? 14 : answer.length;
        const newCollectedWords = [
          {
            text: `${answer[0]?.toUpperCase()}${answer.substring(1)}`,
            points,
          },
          ...collectedWords,
        ];
        localStorage.setItem(
          'collectedWords',
          JSON.stringify(newCollectedWords)
        );
        setToasting(true);
        updateCollection(newCollectedWords);
        setAnswerPoints(points);
        setAnswer('');
        if ([core, ...cells].every((letter) => answer.includes(letter))) {
          setAnswerStatus(AnswerStatus.PANGRAM);
          return;
        }
        const answerStatusValue =
          Object.keys(AnswerStatus)[
            Object.values(AnswerStatus).indexOf(
              AnswerStatus[answer.length - 3] ?? 0
            )
          ];
        const newAnswerStatus = parseInt(answerStatusValue ?? '0');
        setAnswerStatus(newAnswerStatus || AnswerStatus.WOW);
      } else {
        setAnswerStatus(AnswerStatus.NOT_A_WORD);
        tada.set(1);
      }
    },
  });

  const { tada } = useSpring({
    reverse: false,
    tada: 0,
    onStart: () => setToasting(true),
    onRest: () => setAnswer(''),
    config: { duration: 500 },
  });

  const loaderTransition = useTransition(
    checkAnswerMutation.status === 'pending' || status === 'buzzing',
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      delay: 200,
    }
  );

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAnswer(value.toLowerCase());
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent | React.KeyboardEvent) => {
      if (answerStatus !== null) {
        setAnswerPoints(null);
        setAnswerStatus(null);
      }
      flushSync(() => {
        const regex = new RegExp('^[a-zA-Z ]+$');
        if (regex.test(event.key)) {
          setTypedLetter(event.key);
        } else {
          setTypedLetter(null);
          event.preventDefault();
        }
      });
    },
    [answerStatus]
  );

  const onCombSelected = useCallback((letter: string) => {
    setAnswer((answer) => answer + letter);
  }, []);

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const allLetters = [...cells, core];
    if (answer.length < 1) {
      setAnswerStatus(AnswerStatus.EMPTY);
      return;
    }
    if (
      collectedWords.find(
        (word) => word.text.toLowerCase() === answer.toLowerCase()
      )
    ) {
      setAnswerStatus(AnswerStatus.ALREADY_FOUND);
    } else if (
      answer.split('').filter((char) => !allLetters.includes(char)).length > 0
    ) {
      setAnswerStatus(AnswerStatus.BAD_WORD);
    } else if (
      new RegExp(`^[${cells.join('')}]*$`).test(answer) &&
      !answer.includes(core)
    ) {
      setAnswerStatus(AnswerStatus.MISSING_CENTER);
    } else if (answer.length < 4) {
      setAnswerStatus(AnswerStatus.TOO_SHORT);
    } else {
      checkAnswerMutation.mutate();
      return;
    }
    // animation for when word is wrong
    tada.set(1);
  };

  const onToastDone = () => {
    setAnswerStatus(null);
    setAnswerPoints(null);
    setToasting(false);
  };

  const onDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (answer.length) {
      setAnswer((ans) => ans.substring(0, ans.length - 1));
    }
  };

  const onShuffleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    shuffle();
  };

  const onRestartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnswer('');
    reset();
  };

  const AnimatedHighlightedInput = animated(HighlightedInput);

  useEffect(() => {
    if (loaded) {
      setup();
    } else {
      setLoaded(true);
    }
  }, [loaded, setup]);
  return (
    <div className='mx-auto flex w-full max-w-[1080px] flex-auto flex-col items-center justify-start gap-1 pt-7 md:flex-row md:justify-center md:gap-16 md:px-10 md:pt-10'>
      {loaderTransition(
        (styles, show) =>
          show && (
            <animated.div
              className='fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-white/80'
              style={styles}
            >
              <div className='rounded-full bg-white'>
                <Lottie animationData={loadingBeeAnimation} loop={true} />
              </div>
            </animated.div>
          )
      )}
      <div
        className={clsx(
          'relative order-2 max-w-[340px] pb-5 md:order-1 md:w-[80vw] md:pb-11',
          { 'z-50': toasting }
        )}
      >
        <form onSubmit={onFormSubmit} className='flex flex-col'>
          {answerStatus !== null && (
            <div className='relative'>
              <div className='absolute bottom-0 left-1/2 -translate-x-1/2'>
                <Toast
                  status={answerStatus}
                  points={answerPoints}
                  onDone={onToastDone}
                />
              </div>
            </div>
          )}
          <AnimatedHighlightedInput
            value={answer}
            mainLetter={core}
            otherLetters={cells}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            style={{
              translateX: tada.to({
                range: [0, 0.065, 0.185, 0.315, 0.435, 1],
                output: [0, '-6px', '5px', '-3px', '2px', '0'],
              }),
              rotateY: tada.to({
                range: [0, 0.065, 0.185, 0.315, 0.435, 1],
                output: [0, -9, 7, -5, 3, 0],
              }),
            }}
          />
          <Hive
            typedLetter={typedLetter}
            currentWord={answer}
            core={core}
            cells={cells}
            onCombSelected={onCombSelected}
          />
          <div className='my-2 flex items-center justify-center gap-3'>
            <button
              type='button'
              className='h-12 min-w-[5.5em] rounded-full border border-gray-200 bg-white font-light transition-all hover:border-gray-400 active:scale-95'
              onClick={onDeleteClick}
            >
              Delete
            </button>
            <button
              type='button'
              className='flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-2xl transition-all hover:border-gray-400 active:scale-95'
              onClick={onShuffleClick}
            >
              <Icon icon='ph:shuffle-simple-bold' />
            </button>
            <button
              type='button'
              className='flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-2xl transition-all hover:border-gray-400 active:scale-95'
              onClick={onRestartClick}
            >
              <Icon icon='ph:arrow-clockwise-bold' />
            </button>
            <button
              type='submit'
              className='h-12 min-w-[5.5em] rounded-full border border-gray-200 bg-white font-light transition-all hover:border-gray-400 active:scale-95'
            >
              Enter
            </button>
          </div>
        </form>
      </div>
      <div className='relative z-40 order-1 flex w-full flex-col gap-5 px-5 pb-10 md:order-2 md:h-full md:w-[40%] md:px-0 md:pb-16'>
        <ProgressBar percentage={progress} />
        <WordList words={collectedWords} />
      </div>
    </div>
  );
}
