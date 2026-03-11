import type { PropType } from 'vue';
import type { SessionPhase } from '../composables/useExerciseSession';

export const ExerciseCardProperties = {
  question: { type: String, required: true },
  correctAnswer: { type: Number, required: true },
  phase: { type: String as PropType<SessionPhase>, required: true },
  isCorrect: { type: Boolean, required: true },
};

export const ExerciseCardEmits = ['submit'];
