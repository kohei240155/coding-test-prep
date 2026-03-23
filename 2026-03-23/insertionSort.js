let arr = [5, 2, 9, 1, 5, 6];

function insertionSort(arr) {

  for (let i = 0; i < arr.length; i++) {
    let v = arr[i];
    let j = i - 1;
    while (0 <= j && v < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = v;
  }

  return arr;
}

console.log(arr);
console.log(insertionSort(arr));