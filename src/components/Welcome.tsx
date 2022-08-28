import Image from "next/image";
import { useEffect, useState } from "react";
import { useSpring, animated, easings } from "react-spring";
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

  const welcomeStyle = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 100 },
    config: { duration: 400, easing: easings.easeInOutQuad },
  });

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
        "z-50 absolute transition-transform left-0 top-[-1px] h-full w-full bg-amber-300 p-8 md:p-10",
        {
          "pt-28": !continuing,
          "pt-10": continuing,
          hidden: !visible,
        }
      )}
      style={styles}
    >
      {mounted && (
        <animated.div
          className={classNames("flex flex-col items-center mx-auto max-w-xl", {
            "gap-10": !continuing,
            "gap-28 md:gap-40": continuing,
          })}
          style={welcomeStyle}
        >
          <div
            className={classNames("flex flex-col justify-center items-center", {
              "gap-4": !continuing,
              "gap-2": continuing,
            })}
          >
            <Image
              alt="bee"
              src="/bee-icon.svg"
              height={continuing ? 48 : 80}
              width={continuing ? 48 : 80}
            />
            <h1
              className={classNames("font-bold font-slab", {
                "text-4xl": !continuing,
                "text-xl": continuing,
              })}
            >
              Spelling Bee
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex flex-col gap-2">
              {continuing && (
                <h1 className="text-3xl md:text-4xl font-bold font-slab text-center">
                  Welcome Back
                </h1>
              )}
              <p className="font-slab font-medium text-2xl md:text-3xl text-center opacity-90">
                {message}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-56 md:flex-row md:gap-5 md:w-auto">
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
            </div>
            <p className="text-center font-light">Edited by Leithon English</p>
          </div>
        </animated.div>
      )}
    </animated.div>
  );
};

export default Welcome;
