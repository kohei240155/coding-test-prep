let arr = [5, 2, 9, 1, 5, 6];

function selectionSort(arr) {
  let sw = 0;
  for (let i = 0; i < arr.length; i++) {
    let minj = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minj]) {
        minj = j;
      }
    }

    [arr[i], arr[minj]] = [arr[minj], arr[i]];

    if (minj !== i) {
      sw++;
    }
  }

  return { arr, sw }
}

console.log(selectionSort(arr));