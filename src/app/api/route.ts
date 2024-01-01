import z from 'zod';
import pangrams from '@/data/pangrams.json';
import words from '@/data/words.json';

const generateAnswers = (core: string, cells: Array<string>) => {
  const answerRegex = new RegExp(`^(?=.*${core})[${core}${cells}]{4,}$`, `i`);
  return words.filter((word) => answerRegex.test(word));
};

export async function GET() {
  const randomIndex = Math.floor(Math.random() * pangrams.length) + 1;
  const pangram: string | undefined = pangrams[randomIndex];
  if (!pangram) return;
  const letters = [...Array.from(new Set(pangram.split(''))).slice(0, 7)];
  const coreIndex = Math.floor(Math.random() * 7);
  const core = letters[coreIndex] || '';
  const cells = letters.filter((letter) => letter !== core);
  const answerCount = generateAnswers(core, cells).length;
  return Response.json({
    core,
    cells,
    answerCount,
  });
}

export async function POST(request: Request) {
  const validator = z.object({
    core: z.string(),
    cells: z.string().array(),
    word: z.string(),
  });
  const params = await request.json();
  const input = validator.safeParse(params);
  if (input.success) {
    const answers = generateAnswers(input.data.core, input.data.cells);
    return Response.json(answers.includes(input.data.word));
  }
  return Response.json(false);
}
