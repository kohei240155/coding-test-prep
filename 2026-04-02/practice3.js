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