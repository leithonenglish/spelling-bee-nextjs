import { memo, useState } from "react";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { CollectedWord } from "src/types";
import { animated, useTransition } from "react-spring";

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
      className={classNames(
        "relative z-10 flex-auto border border-gray-300 p-3 md:p-5 md:overflow-auto md:rounded",
        { "rounded-t": open, rounded: !open }
      )}
    >
      {words.length > 0 ? (
        <>
          <div
            className="flex justify-between items-center gap-1 md:hidden -m-5 p-5"
            onClick={() => setOpen(!open)}
          >
            <div className="relative flex gap-2 text-sm font-thin w-full overflow-hidden">
              {wordTransitions((styles, word) => (
                <animated.span style={styles} key={word.text}>
                  {word.text}
                </animated.span>
              ))}
              <div className="absolute top-0 right-0 h-full w-[10%] bg-white/90"></div>
            </div>
            <Icon
              icon="ph:caret-down-bold"
              className={classNames("text-xl transition-transform transform", {
                "rotate-180": open,
                "rotate-0": !open,
              })}
            />
          </div>
          <ul
            className={classNames(
              "absolute p-5 border border-gray-300 bg-white rounded-b top-[44px] left-[-1px] right-[-1px] flex-col gap-3 transition-[height,opacity] md:opacity-100 md:top-auto md:right-auto md:left-auto md:h-auto md:relative md:flex md:p-0 md:border-none",
              {
                "opacity-100 overflow-auto h-[65vh]": open,
                "opacity-0 h-0 overflow-hidden": !open,
              }
            )}
          >
            {words.map(({ text, points }) => {
              return (
                <li
                  key={text}
                  className="flex items-center justify-between pb-3 pt-3 border-b border-gray-200 md:pt-0 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <span className="font-bold text-slate-700 tracking-wide">
                    {text}
                  </span>
                  <span className="text-white text-sm font-bold bg-emerald-500 px-2 py-[2px] rounded">
                    +{points}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="text-center text-sm font-thin">
          You haven&apos;t collected any words yet.
        </p>
      )}
    </div>
  );
});

WordList.displayName = "WordList";

export default WordList;
