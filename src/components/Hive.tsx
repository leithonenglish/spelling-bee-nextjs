'use client';
import { memo, useEffect, useState } from 'react';
import Comb from './Comb';

type HiveProps = {
  typedLetter: string | null;
  currentWord: string | null;
  core: string;
  cells: string[];
  onCombSelected: (letter: string) => void;
};

const Hive = memo(
  ({ typedLetter, currentWord, core, cells, onCombSelected }: HiveProps) => {
    const [tapped, setTapped] = useState(false);

    const positions = [
      [-75, -50],
      [0, -100],
      [75, -50],
      [75, 50],
      [0, 100],
      [-75, 50],
    ].map(([x, y]) => {
      return `translate(${x}%, ${y}%)`;
    });

    const isTapped = (letter: string) => {
      if (tapped && letter && typedLetter === letter.toLowerCase()) {
        setTimeout(() => {
          setTapped(false);
        }, 100);
        return true;
      }
      return false;
    };

    useEffect(() => {
      setTapped(true);
    }, [typedLetter, currentWord]);

    return (
      <div className='mx-auto my-6 w-[70%] sm:w-[90%]'>
        <div className='relative w-full pb-[103.92305%]'>
          <Comb
            text={core}
            primary
            className='translate-x-0 translate-y-0'
            tapped={isTapped(core)}
            onClick={onCombSelected.bind(onCombSelected, core)}
          />
          {cells.map((letter, i) => (
            <Comb
              key={letter}
              text={letter}
              tapped={isTapped(letter)}
              style={{ transform: positions[i] }}
              onClick={onCombSelected.bind(onCombSelected, letter)}
            />
          ))}
        </div>
      </div>
    );
  }
);

Hive.displayName = 'Hive';

export default Hive;
