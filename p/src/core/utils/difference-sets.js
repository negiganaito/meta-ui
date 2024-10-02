export function differenceSets(a, ...others) {
  const result = new Set();

  // eslint-disable-next-line no-labels
  FIRST: for (const item of a) {
    for (let i = 0; i < others.length; i++) {
      const otherSet = others[i];
      if (otherSet.has(item)) {
        // eslint-disable-next-line no-labels
        continue FIRST;
      }
    }
    result.add(item);
  }

  return result;
}
