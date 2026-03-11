import type { Exercise, ExerciseGenerator } from './types';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function signedTerm(value: number): string {
  if (value >= 0) return `+ ${value}`;
  return `- ${Math.abs(value)}`;
}

export const generateVergelijking: ExerciseGenerator = (): Exercise => {
  const x = randomInt(-10, 10);
  let a = randomInt(2, 6);
  if (Math.random() < 0.3) a = -a;
  const b = randomInt(-10, 10);
  const c = a * x + b;

  const aStr = a === 1 ? '' : a === -1 ? '-' : String(a);
  const question = `${aStr}x ${signedTerm(b)} = ${c}`;

  return { question, correctAnswer: x };
};
