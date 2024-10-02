export function sortBy(array, iteratee) {
  const mappedArray = array.map((item, index) => ({
    index,
    sortValue: iteratee(item),
    value: item,
  }));

  mappedArray.sort((a, b) => {
    const { sortValue: aValue } = a;
    const { sortValue: bValue } = b;

    if (aValue > bValue) return 1;
    if (aValue < bValue) return -1;
    return a.index - b.index; // Maintain original order if values are equal
  });

  return mappedArray.map((item) => item.value);
}
