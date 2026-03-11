import type { Exercise, ExerciseGenerator } from './types';
import { generateMacht } from './machten';
import { generateVierkantswortel } from './vierkantswortels';
import { generateVergelijking } from './vergelijkingen';
import { generateOngelijkheid } from './ongelijkheden';

const generators: Record<string, ExerciseGenerator> = {
  machten: generateMacht,
  vierkantswortels: generateVierkantswortel,
  vergelijkingen: generateVergelijking,
  ongelijkheden: generateOngelijkheid,
};

export function generateExercises(topicId: string, count: number): Exercise[] {
  const generator = generators[topicId];
  if (!generator) {
    throw new Error(`No generator found for topic: ${topicId}`);
  }

  return Array.from({ length: count }, () => generator());
}
