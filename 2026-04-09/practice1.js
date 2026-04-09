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