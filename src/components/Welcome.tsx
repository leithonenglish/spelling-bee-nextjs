import Image from "next/image";
import { useEffect, useState } from "react";
import { useSpring, animated, easings, useSprings } from "react-spring";
import classNames from "classnames";
import { useComb } from "src/context/word";
import { CollectedWord, StorageName } from "src/types";

const Welcome = () => {
  const { reset } = useComb();
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);
  const [continuing, setContinuing] = useState(false);
  const [message, setMessage] = useState(``);

  const styles = useSpring({
    opacity: open ? 1 : 0,
    y: open ? 0 : window.innerHeight,
    config: { duration: 300 },
    onRest: () => {
      setVisible(false);
    },
  });

  const trail = useSprings(4, (i) => ({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 100 },
    delay: i * 100 - i * 50,
    config: { duration: 300, easing: easings.easeInOutQuad },
  }));

  const resetGame = () => {
    reset();
    setOpen(false);
  };

  useEffect(() => {
    if (loaded) {
      const words: Array<CollectedWord> = JSON.parse(
        localStorage.getItem(StorageName.COLLECTED_WORD) ?? "[]"
      );
      if (words.length > 0) {
        setContinuing(true);
        setMessage(
          `You've found ${words.length} word${words.length > 1 ? "s" : ""}`
        );
      } else {
        setMessage(`How many words can you make with 7 letters?`);
      }
      setMounted(true);
    } else {
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <animated.div
      className={classNames(
        "z-50 absolute transition-transform left-0 top-[-1px] bottom-0 w-full bg-dandelion p-8 md:p-10",
        {
          "md:pt-40": !continuing,
          "pt-10": continuing,
          hidden: !visible,
        }
      )}
      style={styles}
    >
      {mounted && (
        <div
          className={classNames(
            "flex flex-col items-center max-w-xl mx-auto lg:max-w-none",
            {
              "gap-5": !continuing,
              "gap-28 md:gap-40": continuing,
            }
          )}
        >
          <animated.div
            className={classNames("flex flex-col justify-center items-center", {
              "gap-4": !continuing,
              "gap-2": continuing,
            })}
            style={trail[0][0]}
          >
            <Image
              alt="bee"
              src="/bee-icon.svg"
              height={continuing ? 48 : 100}
              width={continuing ? 48 : 100}
            />
            <h1
              className={classNames("font-bold font-zillaSlab", {
                "text-5xl md:text-6xl": !continuing,
                "text-xl": continuing,
              })}
            >
              Spelling Bee
            </h1>
          </animated.div>
          <div className="flex flex-col items-center justify-center gap-8">
            <animated.div className="flex flex-col gap-2" style={trail[0][1]}>
              {continuing && (
                <h1 className="text-3xl md:text-4xl font-bold font-slab text-center">
                  Welcome Back
                </h1>
              )}
              <p className="font-slab text-2xl md:text-3xl text-center opacity-90">
                {message}
              </p>
            </animated.div>
            <animated.div
              className="flex flex-col gap-3 w-56 md:flex-row md:gap-5 md:w-auto"
              style={trail[0][2]}
            >
              {continuing && (
                <button
                  className="bg-transparent font-bold border border-black h-12 min-w-[9.375rem] rounded-[1.5rem] order-2 transition-[background,transform] md:order-1 hover:cursor-pointer hover:bg-opacity-90 hover:scale-95"
                  onClick={resetGame}
                >
                  Start Over
                </button>
              )}
              <button
                className="bg-black text-white font-bold h-12 min-w-[9.375rem] rounded-[1.5rem] order-1 transition-[background,transform] md:order-2 hover:cursor-pointer hover:bg-opacity-90 hover:scale-95"
                onClick={() => setOpen(false)}
              >
                {continuing ? `Continue` : `Play`}
              </button>
            </animated.div>
            <animated.p className="text-center font-light" style={trail[0][3]}>
              Edited by Leithon English
            </animated.p>
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default Welcome;
