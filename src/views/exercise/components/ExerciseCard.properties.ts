import type { PropType } from 'vue';
import type { SessionPhase } from '../composables/useExerciseSession';

export const ExerciseCardProperties = {
  question: { type: String, required: true as const },
  correctAnswer: { type: Number, required: true as const },
  phase: { type: String as PropType<SessionPhase>, required: true as const },
  isCorrect: { type: Boolean, required: true as const },
};

export const ExerciseCardEmits = ['submit'];
