import type { Exercise, ExerciseGenerator } from './types';

const superscripts: Record<string, string> = {
  '0': '\u2070',
  '1': '\u00B9',
  '2': '\u00B2',
  '3': '\u00B3',
  '4': '\u2074',
};

function toSuperscript(n: number): string {
  return String(n)
    .split('')
    .map((d) => superscripts[d] ?? d)
    .join('');
}

export const generateMacht: ExerciseGenerator = (): Exercise => {
  const base = Math.floor(Math.random() * 9) + 2; // 2–10
  const exponent = Math.floor(Math.random() * 3) + 2; // 2–4
  const correctAnswer = Math.pow(base, exponent);

  return {
    question: `${base}${toSuperscript(exponent)}`,
    correctAnswer,
  };
};
