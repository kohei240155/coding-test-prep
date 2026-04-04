let originalNumber = 42;
let copiedNumber = originalNumber;

copiedNumber = 100;

console.log('originalNumber:', originalNumber);
console.log('copiedNumber:', copiedNumber);

let originalString = 'hello';
let copiedString = originalString;

copiedString = 'world';

console.log('originalString:', originalString);
console.log('copiedString:', copiedString);

let price = 1000;
let discountedPrice = price;
discountedPrice = discountedPrice * 0.8;
console.log('price:', price);
console.log('discountedPrice:', discountedPrice);

function tryToChange(value) {
  value = 999;
  console.log('関数内の value:', value);
}

const myNumber = 42;
console.log('関数呼び出し前:', myNumber);

tryToChange(myNumber);

console.log('関数呼び出し後:', myNumber);