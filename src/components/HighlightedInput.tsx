'use client';
import { ChangeEvent, forwardRef, useEffect, useMemo, useRef } from 'react';

type HighlightedInputProps = {
  value: string;
  mainLetter: string;
  otherLetters: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent
  ) => void;
};

const HighlightedInput = forwardRef<HTMLDivElement, HighlightedInputProps>(
  ({ value, mainLetter, otherLetters, onChange, onKeyDown }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const lettersForWord = useMemo(
      () =>
        value.split(``).map((letter) => ({
          letter,
          status:
            letter === mainLetter
              ? `primary`
              : otherLetters.includes(letter)
                ? `secondary`
                : `wrong`,
        })),
      [value, mainLetter, otherLetters]
    );

    useEffect(() => {
      const onBodyKeyDown = (event: KeyboardEvent) => {
        if (!inputRef.current) return;
        if (document.activeElement !== inputRef.current) {
          onKeyDown(event);
        }
        if (!event.metaKey && !event.altKey && !event.shiftKey) {
          inputRef.current.focus();
        }
      };

      document.body.addEventListener(`keydown`, onBodyKeyDown);
      return () => {
        document.body.removeEventListener(`keydown`, onBodyKeyDown);
      };
    }, [onKeyDown]);

    return (
      <div className='relative' ref={ref}>
        <div className='absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2'>
          {!value ? (
            <span className='block w-full whitespace-nowrap text-center text-3xl font-light text-gray-400'>
              Type or click
            </span>
          ) : (
            <div className='flex items-center justify-center overflow-hidden tracking-[-0.025em]'>
              {lettersForWord.map(({ letter, status }, i) => (
                <span
                  key={i + letter}
                  className={`text-3xl font-bold uppercase ${
                    status === `primary`
                      ? 'text-amber-400'
                      : status === `secondary`
                        ? 'text-slate-600'
                        : 'text-gray-300'
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type='text'
          value={value}
          className='relative z-20 w-full whitespace-nowrap bg-transparent text-center text-3xl font-bold uppercase text-transparent caret-black outline-none'
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
);

HighlightedInput.displayName = 'HighlightedInput';

export default HighlightedInput;
