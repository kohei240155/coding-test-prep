/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  const count = new Map();

  for (let num of arr1) {
    count.set(num, (count.get(num) || 0) + 1);
  }

  const result = [];
  for (let num of arr2) {
    while (0 < count.get(num)) {
      result.push(num);
      count.set(num, count.get(num) - 1);
    }
    count.delete(num);
  }

  const remaining = [];
  for (let [key, val] of count) {
    for (let i = 0; i < val; i++) {
      remaining.push(key);
    }
  }

  remaining.sort((a, b) => a - b);

  return result.concat(remaining);
};