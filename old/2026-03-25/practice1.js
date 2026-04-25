let arr = [5, 2, 9, 1, 5, 6];

function bubbleSort(arr) {
  const result = [...arr];

  let swapped = true;

  for (let i = 0; swapped; i++) {
    swapped = false;
    for (let j = result.length - 1; i < j; j--) {
      if (result[j - 1] > result[j]) {
        [result[j - 1], result[j]] = [result[j], result[j - 1]];
        swapped = true;
      }
    }
  }

  return result;
}

console.log(bubbleSort(arr));