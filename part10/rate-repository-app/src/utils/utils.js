export const formatCount = (count) => {
  if (count < 1000) {
    return count;
  }
  const dividedByThousand = (count / 1000).toFixed(1);
  return dividedByThousand + 'k';
};
