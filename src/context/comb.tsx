import { createContext, useCallback, useContext, useState } from 'react';
import { CollectedWord, HiveCache, StorageName } from '@/types';

type CombStatus = 'still' | 'buzzing';

type CombContextProps = {
  status: CombStatus;
  collectedWords: Array<CollectedWord>;
  setup: () => void;
  initialize: () => void;
  reset: () => void;
  shuffle: () => void;
  updateCollection: (words: Array<CollectedWord>) => void;
} & HiveCache;

const defaultComb: CombContextProps = {
  status: 'still',
  cells: [],
  core: '',
  answerCount: 0,
  collectedWords: [],
  setup: () => {},
  initialize: () => {},
  reset: () => {},
  shuffle: () => {},
  updateCollection: () => {},
};

const CombContext = createContext<CombContextProps>(defaultComb);

const CombProvider = ({ children }: { children: React.ReactNode }) => {
  const [core, setCore] = useState(defaultComb.core);
  const [cells, setCells] = useState(defaultComb.cells);
  const [answerCount, setAnswerCount] = useState(defaultComb.answerCount);
  const [collectedWords, setCollectedWords] = useState(
    defaultComb.collectedWords
  );
  const [status, setStatus] = useState<CombStatus>(defaultComb.status);

  const initialize = useCallback(async () => {
    try {
      setStatus('buzzing');
      const response = await fetch('/api');
      const data = (await response.json()) as HiveCache;
      setStatus('still');
      if (!data) return;
      setCore(data.core);
      setCells(data.cells);
      setAnswerCount(data.answerCount);
      localStorage.setItem(
        StorageName.HIVE,
        JSON.stringify({
          core: data.core,
          cells: data.cells,
          answerCount: data.answerCount,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(StorageName.COLLECTED_WORD);
    setCollectedWords([]);
    initialize();
  }, [initialize]);

  const setup = useCallback(() => {
    const previouslyCollectedWords: Array<CollectedWord> = JSON.parse(
      localStorage.getItem(StorageName.COLLECTED_WORD) ?? '[]'
    );
    if (previouslyCollectedWords.length) {
      setCollectedWords(previouslyCollectedWords);
    }
    const hiveCache: HiveCache | null = JSON.parse(
      localStorage.getItem(StorageName.HIVE) ?? 'null'
    );
    if (hiveCache) {
      setCore(hiveCache.core);
      setCells(hiveCache.cells);
      setAnswerCount(hiveCache.answerCount);
    } else {
      initialize();
    }
  }, [initialize]);

  const shuffle = () => {
    setCells((letters) => [...letters.sort(() => Math.random() - 0.5)]);
  };

  const updateCollection = (words: Array<CollectedWord>) => {
    setCollectedWords(words);
  };

  const value = {
    setup,
    initialize,
    reset,
    shuffle,
    updateCollection,
    status,
    core,
    cells,
    answerCount,
    collectedWords,
  };
  return <CombContext.Provider value={value}>{children}</CombContext.Provider>;
};

function useComb() {
  const context = useContext(CombContext);
  if (context === undefined) {
    throw new Error('useComb must be used within a CombProvider');
  }
  return context;
}

export { CombProvider, useComb };
