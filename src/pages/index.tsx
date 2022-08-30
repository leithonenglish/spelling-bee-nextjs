import { NextPageWithLayout } from "next-layout";
import React, {
  useState,
  useMemo,
  ChangeEvent,
  useCallback,
  FormEvent,
  MouseEvent,
  useEffect,
  ReactElement,
} from "react";
import { flushSync } from "react-dom";
import { useSpring, animated } from "react-spring";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import GameLayout from "src/layouts/game";
import {
  Hive,
  HighlightedInput,
  Toast,
  ProgressBar,
  WordList,
  Welcome,
} from "src/components";
import { AnswerStatus } from "src/types";
import { trpc } from "src/utils/trpc";
import { useComb } from "src/context/word";

const Home: NextPageWithLayout = () => {
  const {
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
  const [answer, setAnswer] = useState(``);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus | null>(null);
  const [answerPoints, setAnswerPoints] = useState<number | null>(null);
  const progress = useMemo(
    () => (collectedWords.length / answerCount) * 100,
    [collectedWords, answerCount]
  );

  const { refetch: checkAnswer } = trpc.useQuery(
    ["word.isAnswer", { cells, core, word: answer }],
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: false,
      onSuccess(data) {
        if (data) {
          const points = answerStatus === AnswerStatus.OMG ? 14 : answer.length;
          const newCollectedWords = [
            {
              text: `${answer[0]?.toUpperCase()}${answer.substring(1)}`,
              points,
            },
            ...collectedWords,
          ];
          localStorage.setItem(
            `collectedWords`,
            JSON.stringify(newCollectedWords)
          );
          updateCollection(newCollectedWords);
          setAnswerPoints(points);
          setAnswer(``);
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
          const newAnswerStatus = parseInt(answerStatusValue ?? "0");
          setAnswerStatus(newAnswerStatus || AnswerStatus.WOW);
        } else {
          setAnswerStatus(AnswerStatus.NOT_A_WORD);
          tada.set(1);
        }
      },
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
        const regex = new RegExp("^[a-zA-Z ]+$");
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
      answer.split(``).filter((char) => !allLetters.includes(char)).length > 0
    ) {
      setAnswerStatus(AnswerStatus.BAD_WORD);
    } else if (
      new RegExp(`^[${cells.join("")}]*$`).test(answer) &&
      !answer.includes(core)
    ) {
      setAnswerStatus(AnswerStatus.MISSING_CENTER);
    } else if (answer.length < 4) {
      setAnswerStatus(AnswerStatus.TOO_SHORT);
    } else {
      checkAnswer();
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
    setAnswer("");
    reset();
  };

  const { tada } = useSpring({
    reverse: false,
    tada: 0,
    onStart: () => setToasting(true),
    onRest: () => setAnswer(``),
    config: { duration: 500 },
  });

  const AnimatedHighlightedInput = animated(HighlightedInput);

  useEffect(() => {
    if (loaded) {
      setup();
    } else {
      setLoaded(true);
    }
  }, [loaded, setup]);

  if (!loaded || !cells.length) return null;

  return (
    <>
      <div className="flex-auto w-full flex flex-col gap-1 justify-start items-center max-w-[1080px] mx-auto pt-7 md:justify-center md:px-10 md:pt-10 md:flex-row md:gap-16">
        <div
          className={classNames(
            "relative max-w-[340px] pb-5 order-2 md:order-1 md:pb-11 md:w-[80vw]",
            { "z-50": toasting }
          )}
        >
          <form onSubmit={onFormSubmit} className="flex flex-col">
            {answerStatus !== null && (
              <div className="relative">
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
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
                  output: [`0`, `-6px`, `5px`, `-3px`, `2px`, `0`],
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
            <div className="flex justify-center items-center gap-3 my-2">
              <button
                type="button"
                className="font-light bg-white min-w-[5.5em] h-12 border border-gray-200 rounded-full transition-all hover:border-gray-400 active:scale-95"
                onClick={onDeleteClick}
              >
                Delete
              </button>
              <button
                type="button"
                className="flex justify-center items-center text-2xl bg-white w-12 h-12 border border-gray-200 rounded-full transition-all hover:border-gray-400 active:scale-95"
                onClick={onShuffleClick}
              >
                <Icon icon="ph:shuffle-simple-bold" />
              </button>
              <button
                type="button"
                className="flex justify-center items-center text-2xl bg-white w-12 h-12 border border-gray-200 rounded-full transition-all hover:border-gray-400 active:scale-95"
                onClick={onRestartClick}
              >
                <Icon icon="ph:arrow-clockwise-bold" />
              </button>
              <button
                type="submit"
                className="font-light bg-white min-w-[5.5em] h-12 border border-gray-200 rounded-full transition-all hover:border-gray-400 active:scale-95"
              >
                Enter
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-5 w-full px-5 pb-10 order-1 md:order-2 md:w-[40%] md:px-0 md:h-full md:pb-16">
          <ProgressBar percentage={progress} />
          <WordList words={collectedWords} />
        </div>
      </div>
      <Welcome />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <GameLayout>{page}</GameLayout>;
};

export default Home;
