// function heavyTask(label) {
//   console.log(`${label}: 開始`);
//   const start = Date.now();

//   while (Date.now() - start < 2000) {
//   }

//   console.log(`${label}: 完了 (${Date.now() - start}ms)`);
// }

// console.log('main: 開始');
// heavyTask('重い処理A');
// console.log('main: Aの後');
// heavyTask('重い処理B');
// console.log('main: 全て完了');

// console.log('1: main 開始');

// setTimeout(function delayedTask() {
//   console.log('2: setTimeout のコールバック実行');
// }, 0);

// console.log('3: main 終了');

// console.log('1: script 開始（同期）');

// setTimeout(function macroTask() {
//   console.log('5: setTimeout コールバック（マクロタスク）');
// }, 0);

// Promise.resolve().then(function microTask() {
//   console.log('3: Promise.then コールバック（マイクロタスク）');
// });

// queueMicrotask(function anotherMicroTask() {
//   console.log('4: queueMicrotask コールバック（マイクロタスク）');
// });

// console.log('2: script 終了（同期）');


console.log('1: script 開始');

setTimeout(function macro() {
  console.log('6: setTimeout(マクロタスク)');
}, 0);

Promise.resolve()
  .then(function micro1() {
    console.log('2: Promise.then #1');
    return Promise.resolve();
  })
  .then(function micro2() {
    console.log('3: Promise.then #2');
    queueMicrotask(function micro3() {
      console.log('4: queueMicrotask (micro2 の中から追加)');
    })
  })
  .then(function micro4() {
    console.log('5: Promise.then #3');
  });

console.log('--- script 終了 ---');