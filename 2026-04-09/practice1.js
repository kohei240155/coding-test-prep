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