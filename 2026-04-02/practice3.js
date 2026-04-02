// Step1
const stringValue = "hello";
const numberValue = 42;
const bigintValue = 9007199254740991n;
const booleanValue = true;
const undefinedValue = undefined;
const symbolValue = Symbol("id");
const nullValue = null;

console.log("--------- Step1 ---------");
console.log("typeof string:", typeof stringValue);
console.log("typeof number:", typeof numberValue);
console.log("typeof bigint:", typeof bigintValue);
console.log("typeof boolean:", typeof booleanValue);
console.log("typeof undefined:", typeof undefinedValue);
console.log("typeof symbol:", typeof symbolValue);
console.log("typeof null:", typeof nullValue);

console.log("typeof function:", typeof function () { });
console.log("typeof array:", typeof [1, 2, 3]);
console.log("typeof object:", typeof { name: "JS" });
console.log("-------------------------");

console.log("--------- Step2 ---------");
const targetNull = null;
const targetObject = { name: "JS" };

console.log("null === null:", targetNull === null);
console.log("object === null:", targetObject === null);

function getType(value) {
  if (value === null) return "null";
  return typeof value;
}

console.log("getType(null):", getType(targetNull));
console.log("getType({}):", getType(targetObject));
console.log("getType(42):", getType(42));
console.log("getType(undefined):", getType(undefined));

console.log("toString null:", Object.prototype.toString.call(null));
console.log("toString array:", Object.prototype.toString.call([1, 2]));
console.log("toString object:", Object.prototype.toString.call({ a: 1 }));
console.log("toString number:", Object.prototype.toString.call(42));

console.log("typeof NaN:", typeof NaN);
console.log("NaN === NaN:", NaN === NaN);
console.log("Number.isNaN(NaN):", Number.isNaN(NaN));
console.log("-------------------------");

console.log("--------- Step3 ---------");
const patterns = [
  { left: "0", right: false, label: '"0" == false' },
  { left: "", right: false, label: '"" == false' },
  { left: "", right: 0, label: '"" == 0' },
  { left: "1", right: true, label: '"1" == true' },
  { left: null, right: undefined, label: 'null == undefined' },
  { left: null, right: 0, label: 'null == 0' },
  { left: [], right: 0, label: '[] == 0' },
  { left: [], right: "", label: '[] == ""' },
  { left: [1], right: 1, label: '[1] == 1' },
  { left: [1, 2], right: "1,2", label: '[1,2] == "1,2"' }
]

patterns.forEach(({ left, right, label }) => {
  console.log(`${label.padEnd(22)} -> ${left == right}`);
})

console.log("[] == false:", [] == false);
console.log("![] == false:", ![] == false);

console.log("--------- Step4 ---------");

const patterns2 = [
  { left: "0", right: false, label: '"0" === false' },
  { left: "", right: false, label: '"" === false' },
  { left: "", right: 0, label: '"" === 0' },
  { left: "1", right: true, label: '"1" === true' },
  { left: null, right: undefined, label: 'null === undefined' },
  { left: null, right: 0, label: 'null === 0' },
  { left: [], right: 0, label: '[] === 0' },
  { left: [], right: "", label: '[] === ""' },
  { left: [1], right: 1, label: '[1] === 1' },
  { left: [1, 2], right: "1,2", label: '[1,2] === "1,2"' }
]

patterns2.forEach(({ left, right, label }) => {
  console.log(`${label.padEnd(22)} -> ${left === right}`);
})

console.log("Object.is(NaN, NaN):", Object.is(NaN, NaN));
console.log("Object.is(0, -0):", Object.is(0, -0));
console.log("0 === -0:", 0 === -0);

console.log("-------------------------");

console.log("--------- Step5 ---------");

const numberTestCases = [
  ["空文字列 ''", ""],
  ["スペース ' '", " "],
  ["文字列 '42'", "42"],
  ["文字列 '42abc'", "42abc"],
  ["文字列 '0x1A'", "0x1A"],
  ["true", true],
  ["false", false],
  ["null", null],
  ["undefined", undefined],
  ["空配列 []", []],
  ["配列 [1]", [1]],
  ["配列 [1,2]", [1, 2]],
];

console.log("=== Number() の変換結果 ===");
numberTestCases.forEach(([description, value]) => {
  const result = Number(value);
  console.log(`Number(${description.padEnd(18)} -> ${result})`);
});

console.log("\n=== parseInt() の変換結果 ===");
const parseIntTestCases = [
  ["'42'", "42"],
  ["'42abc'", "42abc"],
  ["'abc42'", "abc42"],
  ["'0x1A'", "0x1A"],
  ["''", ""],
  ["' 42 '", " 42 "],
  ["'3.14'", "3.14"],
];

parseIntTestCases.forEach(([description, value]) => {
  const result = parseInt(value);
  console.log(`parseInt(${description.padEnd(12)}) -> ${result}`);
})

console.log("Number([]):", Number([]));
console.log("Number([null]):", Number([null]));
console.log("Number([undefined]):", Number([undefined]));

console.log("-------------------------");

console.log("--------- Step6 ---------");

const stringTestCases = [
  [42, "42"],
  [0, "0"],
  [-0, "-0"],
  [NaN, "NaN"],
  [Infinity, "Infinity"],
  [true, "true"],
  [false, "false"],
  [null, "null"],
  [undefined, "undefined"],
  [[], "[]"],
  [[1, 2], "[1, 2]"],
  [{ name: "JS" }, "{ name: 'JS' }"],
];

console.log("=== String() の変換結果 ===");
stringTestCases.forEach(([value, expectedHint]) => {
  console.log(`String(${String(expectedHint).padEnd(18)}) -> "${String(value)}"`);
});

console.log("\n=== Boolean() の変換結果（falsy 値） ===");
const falsyValues = [
  ["false", false],
  ["0", 0],
  ["-0", -0],
  ['""', ""],
  ["null", null],
  ["undefined", undefined],
  ["NaN", NaN],
  ["0n", 0n],
]

falsyValues.forEach(([label, value]) => {
  console.log(`Boolean(${label.padEnd(12)}) -> ${Boolean(value)}`);
});

console.log("\n=== 驚きの truthy 値 ===");
const surprisingTruthy = [
  ['"0"（文字列のゼロ）', "0"],
  ['"false"（文字列のfalse）', "false"],
  ["[]（空配列）", []],
  ["{}（空オブジェクト）", {}],
]

surprisingTruthy.forEach(([label, value]) => {
  console.log(`Boolean(${label.padEnd(28)} -> ${Boolean(value)})`);
});

console.log("");
console.log("String(-0):", String(-0));
console.log("-0 + '':", -0 + "");
console.log("JSON.stringify(-0):", JSON.stringify(-0));
console.log("String([] + []):", String([] + []));
console.log("String([] + {}):", String([] + {}));
console.log("String({} + []):", String({} + []));

console.log("-------------------------");