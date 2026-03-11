import type { Exercise, ExerciseGenerator } from './types';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function signedTerm(value: number): string {
  if (value >= 0) return `+ ${value}`;
  return `- ${Math.abs(value)}`;
}

const signs = ['>', '<', '\u2265', '\u2264'] as const;

export const generateOngelijkheid: ExerciseGenerator = (): Exercise => {
  const x = randomInt(-10, 10);
  let a = randomInt(2, 6);
  if (Math.random() < 0.3) a = -a;
  const b = randomInt(-10, 10);
  const c = a * x + b;

  const sign = signs[Math.floor(Math.random() * signs.length)]!;
  // When dividing by negative a, the inequality flips
  const resultSign =
    a > 0
      ? sign
      : sign === '>'
        ? '<'
        : sign === '<'
          ? '>'
          : sign === '\u2265'
            ? '\u2264'
            : '\u2265';

  const aStr = a === 1 ? '' : a === -1 ? '-' : String(a);
  const question = `${aStr}x ${signedTerm(b)} ${sign} ${c}\nx ${resultSign} ?`;

  return { question, correctAnswer: x };
};
