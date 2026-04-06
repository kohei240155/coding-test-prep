function demonstrateVarScope() {
  if (true) {
    var message = "Varで宣言しました";
  }
  console.log("ifブロックの外:", message);
}

demonstrateVarScope();

function demonstrateBlockScope() {
  if (true) {
    let blockLet = "letで宣言しました";
    const blockConst = "constで宣言しました";
    console.log("ifブロックの中(let):", blockLet);
    console.log("ifブロックの中(const):", blockConst);
  }

  try {
    console.log("ifブロックの外(let):", blockLet);
  } catch (error) {
    console.log("letのエラー:", error.message);
  }

  try {
    console.log("ifブロックの外(const):", blockConst);
  } catch (error) {
    console.log("constのエラー:", error.message);
  }
}

demonstrateBlockScope();

for (var i = 0; i < 3; i++) {

}
console.log("varのi:", i);

for (let j = 0; j < 3; j++) {

}

try {
  console.log("letのj:", j);
} catch (error) {
  console.log("letのjエラー:", error.message);
}