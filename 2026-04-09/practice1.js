const globalName = 'GLOBAL';

function outer() {
  const outerName = 'OUTER';

  function inner() {
    const innerName = 'INNER';
    console.log('innerName:', innerName);
    console.log('outerName:', outerName);
    console.log('globalName:', globalName);
    console.log('this:', this);
  }
  inner();
}

outer();

const name = 'GLOBAL';

function sayName() {
  console.log('name:', name);
}

function callerWithLocalName() {
  const name = 'LOCAL IN CALLER';
  sayName();
}

callerWithLocalName();

let depth = 0;

function recurse() {
  depth++;
  const big = new Array(10000).fill(0);
  recurse();
}

try {
  recurse();
} catch (e) {
  console.log('depth', depth);
  console.log('error name:', e.name);
  console.log('error message:', e.message);
  console.log('reached depth:', depth);
}