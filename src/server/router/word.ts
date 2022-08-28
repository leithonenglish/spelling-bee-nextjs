import { createRouter } from "./context";
import { z } from "zod";
import pangrams from "../../data/pangrams.json";
import words from "../../data/words.json";

const generateAnswers = (core: string, cells: Array<string>) => {
  const letterRegex = `[${cells.join("")}${core}]*`;
  const answerRegex = new RegExp(`^${letterRegex}${core}+${letterRegex}$`, `g`);
  return words.filter((word) => answerRegex.test(word));
};

export const wordRouter = createRouter()
  .query("initialize", {
    resolve() {
      let core: string | undefined = "";
      let cells = [];
      const randomIndex = Math.floor(Math.random() * pangrams.length) + 1;
      const pangram: string | undefined = pangrams[randomIndex];
      if (!pangram) return;
      const letters = [...Array.from(new Set(pangram.split(""))).slice(0, 7)];
      const coreIndex = Math.floor(Math.random() * 7);
      core = letters[coreIndex] || "";
      cells = letters.filter((letter) => letter !== core);
      const answerCount = generateAnswers(core, cells).length;
      return {
        core,
        cells,
        answerCount,
      };
    },
  })
  .query("isAnswer", {
    input: z.object({
      core: z.string(),
      cells: z.string().array(),
      word: z.string(),
    }),
    resolve({ input }) {
      const answers = generateAnswers(input.core, input.cells);
      return answers.includes(input.word);
    },
  });
