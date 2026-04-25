let arr = [5, 2, 9, 1, 5, 6];

function selectionSort(arr) {
  let sw = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    let minj = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minj]) {
        minj = j;
      }
    }

    // swap
    let t = arr[i];
    arr[i] = arr[minj];
    arr[minj] = t;

    if (i !== minj) sw++;
  }

  console.log(arr.join(" "));
  console.log(sw);
  return arr;
}

console.log(selectionSort(arr));