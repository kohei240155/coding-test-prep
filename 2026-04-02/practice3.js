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

console.log("typeof function:", typeof function() {});
console.log("typeof array:", typeof [1, 2, 3]);
console.log("typeof object:", typeof { name: "JS"});
console.log("-------------------------");

console.log("--------- Step2 ---------");


console.log("-------------------------");