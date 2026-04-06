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


function addSkill(userObj) {
  userObj.skills.push('TypeScript');
  console.log('関数内:', userObj);
}

const developer = { name: 'Bob', skills: ['JavaScript'] };
console.log('呼び出し前:', developer);

addSkill(developer);

console.log('呼び出し後:', developer);

console.log('---');

function replaceUser(userObj) {
  userObj = { name: 'Charlie', skills: ['Python'] };
  console.log('関数内（再代入後）:', userObj);
}

const engineer = { name: 'Dave', skills: ['Go'] };
console.log('呼び出し前:', engineer);

replaceUser(engineer);

console.log('呼び出し後:', engineer);

function updateName(obj) {
  obj.name = 'Eve';
  obj = { name: 'Frank' };
  obj.name = 'Grace';
};

const person = { name: 'Alice' };
updateName(person);
console.log('person.name:', person.name);

const originalTodos = ['買い物', '洗濯', '料理'];
const sharedTodos = originalTodos;

sharedTodos.push('掃除');

console.log('originalTodos:', originalTodos);
console.log('sharedTodos:', sharedTodos);
console.log('同じ配列？:', originalTodos === sharedTodos);

console.log('---');

const numbers = [3, 1, 4, 1, 5];

const sortedRef = numbers.sort();
console.log('numbers(sort後):', numbers);
console.log('sortedRef:', sortedRef);
console.log('同じ配列？:', numbers === sortedRef);

console.log('---');

const numbers2 = [3, 1, 4, 1, 5];
const sortedCopy = numbers2.toSorted();
console.log('number2(toSorted後):', numbers2);
console.log('sortedCopy:', sortedCopy);
console.log('同じ配列？:', numbers2 === sortedCopy);

const listA = [1, 2, 3];
const listB = listA;
const listC = [...listA];

listA.push(4);

console.log('listA:', listA);
console.log('listB:', listB);
console.log('listC:', listC);

const original = { name: 'Alice', age: 25, hobbies: ['読書', '映画'] };

const copy1 = { ...original };

const copy2 = Object.assign({}, original);

const originalArray = [1, 2, 3];
const copy3 = [...originalArray];
const copy4 = Array.from(originalArray);

copy1.name = 'Bob';
copy1.age = 30;

console.log('original.name:', original.name);
console.log('copy1.name:', copy1.name);
console.log('独立している？:', original !== copy1);

console.log('---');

copy1.hobbies.push('旅行');

console.log('original.hobbies:', original.hobbies);
console.log('copy1.hobbies:', copy1.hobbies);
console.log('hobbies は同じ配列？:', original.hobbies === copy1.hobbies);

const config = { theme: 'dark', sizes: { width: 100, height: 200 } };
const newConfig = { ...config };
newConfig.theme = 'light';
newConfig.sizes.width = 500;

console.log('config.theme:', config.theme);
console.log('config.sizes.width:', config.sizes.width);

const original2 = {
  name: 'Alice',
  age: 25,
  hobbies: ['読書', '映画'],
  address: {
    city: '東京',
    zip: '100-0001',
  },
};

const deepCopy = structuredClone(original2);

deepCopy.hobbies.push('旅行');
deepCopy.address.city = '大阪';

console.log('original2.hobbies:', original2.hobbies);
console.log('deepCopy.hobbies:', deepCopy.hobbies);
console.log('hobbies は同じ配列？', original2.hobbies === deepCopy.hobbies);

console.log('---');

console.log('original2.address.city:', original2.address.city);
console.log('deepCopy.address.city:', deepCopy.address.city);

console.log('---');

try {
  const withFunction = {
    name: 'Alice',
    greet: function () {
      return 'Hello!';
    },
  };
  const copied = structuredClone(withFunction);
} catch (error) {
  console.log('エラー:', error.message);
}

console.log('---');

const originalWithDate = {
  name: 'Alice',
  createdAt: new Date('2024-01-01'),
  value: undefined,
  regexp: /hello/g,
};

const jsonCopy = JSON.parse(JSON.stringify(originalWithDate));

console.log('=== JSON.parse(JSON.stringify()) の制限 ===');
console.log(
  'original.createdAt:',
  originalWithDate.createdAt,
  '型:',
  typeof originalWithDate.createdAt,
);
console.log(
  'jsonCopy.createdAt:',
  jsonCopy.createdAt,
  '型:',
  typeof jsonCopy.createdAt,
);

console.log('original.value:', originalWithDate.value);
console.log('jsonCopy.value:', jsonCopy.value);
console.log('original.regexp:', originalWithDate.regexp);
console.log('jsonCopy.regexp:', jsonCopy.regexp);