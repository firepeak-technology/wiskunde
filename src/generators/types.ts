export type Exercise = {
  question: string;
  correctAnswer: number;
};

export type ExerciseGenerator = () => Exercise;
