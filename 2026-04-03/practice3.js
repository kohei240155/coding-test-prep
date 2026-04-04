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

function increment(num) {
  num++;
  return num;
}

let count = 5;
let result = increment(count);
console.log('count:', count);
console.log('result:', result);

const originalUser = { name: 'Alice', age: 25 };
const copiedUser = originalUser;

copiedUser.age = 30;

console.log('originalUser:', originalUser);
console.log('copiedUser:', copiedUser);
console.log('同じオブジェクト？:', originalUser === copiedUser);


const teamA = { score: 0 };
const teamB = teamA;
teamB.score = 10;
console.log('teamA.score:', teamA.score);

