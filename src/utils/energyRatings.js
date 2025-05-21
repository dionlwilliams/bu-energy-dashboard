export const getEfficiencyRating = (kWhPerSqm) => {
  if (kWhPerSqm <= 150) return { grade: 'A+', colorIndex: 0 };
  if (kWhPerSqm <= 180) return { grade: 'A', colorIndex: 1 };
  if (kWhPerSqm <= 210) return { grade: 'B', colorIndex: 2 };
  return { grade: 'C', colorIndex: 3 };
};