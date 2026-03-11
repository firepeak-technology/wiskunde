export const ScoreSummaryProperties = {
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  level: { type: String, required: true },
  topic: { type: String, required: true },
};

export const ScoreSummaryEmits = ['retry', 'back'];
