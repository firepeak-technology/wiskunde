export const ScoreSummaryProperties = {
  score: { type: Number, required: true },
  total: { type: Number, required: true },
};

export const ScoreSummaryEmits = ['retry', 'back'];
