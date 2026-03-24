let arr = [5, 2, 9, 1, 5, 6];

function bubbleSort(arr) {

  let flag = true;
  let sw = 0;

  for (let i = 0; flag; i++) {
    flag = false;
    for (let j = arr.length - 1; i + 1 <= j; j--) {
      if (arr[j - 1] > arr[j]) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
        flag = true;
        sw++;
      }
    }
  }

  return { arr, sw };
}

console.log(bubbleSort(arr));