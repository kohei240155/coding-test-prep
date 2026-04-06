function demonstrateVarScope() {
  if (true) {
    var message = "Varで宣言しました";
  }
  console.log("ifブロックの外:", message);
}

demonstrateVarScope();

