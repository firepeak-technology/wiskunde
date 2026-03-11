export type ExerciseResult = {
  id?: number;
  sessionId: string;
  level: string;
  topic: string;
  userName: string;
  question: string;
  correctAnswer: number;
  givenAnswer: number;
  isCorrect: boolean;
  timestamp: number;
};

export type SessionSummary = {
  id?: number;
  sessionId: string;
  level: string;
  topic: string;
  userName: string;
  score: number;
  total: number;
  date: string;
  timestamp: number;
};
