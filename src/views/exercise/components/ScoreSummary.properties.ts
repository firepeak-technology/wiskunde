export const ScoreSummaryProperties = {
  score: { type: Number, required: true as const },
  total: { type: Number, required: true as const },
  level: { type: String, required: true as const },
  topic: { type: String, required: true as const },
};

export const ScoreSummaryEmits = ['retry', 'back'];
