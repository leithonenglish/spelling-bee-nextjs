import React, { useCallback, useState } from "react";
import { CollectedWord, HiveCache, StorageName } from "src/types";
import { trpc } from "src/utils/trpc";

type CombContextProps = {
  initializing: boolean;
  collectedWords: Array<CollectedWord>;
  setup: () => void;
  initialize: () => void;
  reset: () => void;
  shuffle: () => void;
  updateCollection: (words: Array<CollectedWord>) => void;
} & HiveCache;

const CombContext = React.createContext<CombContextProps>({
  initializing: false,
  cells: [],
  core: "",
  answerCount: 0,
  collectedWords: [],
  setup: () => ({}),
  initialize: () => ({}),
  reset: () => ({}),
  shuffle: () => ({}),
  updateCollection: () => ({}),
});

const CombProvider = ({ children }: { children: React.ReactNode }) => {
  const [core, setCore] = useState<string>(``);
  const [cells, setCells] = useState<Array<string>>([]);
  const [answerCount, setAnswerCount] = useState(0);
  const [collectedWords, setCollectedWords] = useState<Array<CollectedWord>>(
    []
  );

  const { refetch: initialize, isLoading: initializing } = trpc.useQuery(
    ["word.initialize"],
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: false,
      onSuccess(data) {
        if (data) {
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
        }
      },
    }
  );

  const reset = () => {
    localStorage.removeItem(StorageName.COLLECTED_WORD);
    setCollectedWords([]);
    initialize();
  };

  const setup = useCallback(() => {
    const previouslyCollectedWords: Array<CollectedWord> = JSON.parse(
      localStorage.getItem(StorageName.COLLECTED_WORD) ?? "[]"
    );
    if (previouslyCollectedWords.length) {
      setCollectedWords(previouslyCollectedWords);
    }
    const hiveCache: HiveCache | null = JSON.parse(
      localStorage.getItem(StorageName.HIVE) ?? `null`
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
    initializing,
    core,
    cells,
    answerCount,
    collectedWords,
  };
  return <CombContext.Provider value={value}>{children}</CombContext.Provider>;
};

function useComb() {
  const context = React.useContext(CombContext);
  if (context === undefined) {
    throw new Error("useComb must be used within a CombProvider");
  }
  return context;
}

export { CombProvider, useComb };
