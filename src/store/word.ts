import { atom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';
import { CollectedWord, HiveCache } from '@/types';

type Comb = {
  initializing?: boolean;
  collectedWords: Array<CollectedWord>;
} & HiveCache;

const initial = {
  collectedWords: [],
  cells: [],
  answerCount: 0,
};

const combAtom = atom<Comb>(initial, (get, set, action) => {
  //   const initialize = async () => {
  //     const response = await fetch('/api');
  //     const data = (await response.json()) as HiveCache;
  //     if (!data) return comb;
  //     return { ...comb, ...data };
  //   };
  if (action === 'initialize') return await initialize();
  if (action === 'shuffle') {
    const cells = [...comb.cells.sort(() => Math.random() - 0.5)];
    return { ...comb, cells };
  }
  if (action === 'reset') {
    const updatedComb = await initialize();
    return { ...updatedComb, collectedWords: [] };
  }
});

const combReducer = async (
  comb: Comb,
  action: 'initialize' | 'shuffle' | 'reset'
): Promise<Comb> => {
  const initialize = async () => {
    const response = await fetch('/api');
    const data = (await response.json()) as HiveCache;
    if (!data) return comb;
    return { ...comb, ...data };
  };
  if (action === 'initialize') return await initialize();
  if (action === 'shuffle') {
    const cells = [...comb.cells.sort(() => Math.random() - 0.5)];
    return { ...comb, cells };
  }
  if (action === 'reset') {
    const updatedComb = await initialize();
    return { ...updatedComb, collectedWords: [] };
  }
  throw new Error('unknown action type');
};

const combReducerAtom = atomWithReducer(initial, combReducer);
