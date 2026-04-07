function third() {
  console.log('step: third() 実行中');
  console.trace('現在のコールスタック');
}

function second() {
  console.log('step: second() 実行中');
  third();
  console.log('step: second() 再開(thirdから戻った)');
}

function first() {
  console.log('step: first() 実行中');
  second();
  console.log('step: first() 再開（secondから戻った）');
}

console.log('step: main 開始');
first();
console.log('step: main 終了');

console.log('');