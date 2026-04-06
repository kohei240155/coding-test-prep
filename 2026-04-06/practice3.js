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

const userName = "太郎";

try {
  userName = "花子";
} catch (error) {
  console.log("再代入エラー:", error.message);
}

const userProfile = { name: "太郎", age: 25 };
console.log("変更前:", userProfile);

userProfile.age = 26;
userProfile.email = "taro@example.com";
console.log("変更後:", userProfile);

const scores = [80, 90, 70];
scores.push(100);
console.log("配列変更後:", scores);

try {
  userProfile = { name: "花子" };
} catch (error) {
  console.log("オブジェクト再代入エラー:", error.message);
}

console.log("宣言前にアクセス:", hoistedVar);

var hoistedVar = "初期化された値";

console.log("宣言後にアクセス:", hoistedVar);

try {
  console.log("letの宣言前:", hoistedLet);
} catch (error) {
  console.log("letのエラー:", error.message);
}

let hoistedLet = "letの値";
console.log("letの宣言後:", hoistedLet);

let outerValue = "外側";

function checkTDZ() {
  try {
    console.log("innerValueの値:", innerValue);
  } catch (error) {
    console.log("エラー:", error.message);
  }
  let innerValue = "外側";
}

checkTDZ();


console.log("関数宣言の結果:", greet("太郎"));

function greet(name) {
  return `こんにちは、${name}さん！`
}

try {
  console.log("関数式(var)の結果:", greetVar("花子"));
} catch (error) {
  console.log("関数式(var)のエラー:", error.message);
}

var greetVar = function (name) {
  return `こんにちは、${name}さん！`
}

try {
  console.log("アロー関数(const)の結果:", greetArrow("次郎"));
} catch (error) {
  console.log("アロー関数(const)のエラー:", error.message);
}

const greetArrow = (name) => `こんにちは、${name}さん！`;