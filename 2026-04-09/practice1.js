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

function sync() {
  console.log('[sync] start');
  console.log('[sync] end');
}

function async() {
  console.log('[async] start');
  setTimeout(() => {
    console.log('[async] timer callback');
    console.trace('timer callback stack');
  }, 0);
  console.log('[async] end (timer はまだ実行されていない)');
}

console.log('--- main start ---');
sync();
async();
console.log('--- main end ---');