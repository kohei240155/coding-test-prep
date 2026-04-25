const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

rl.on("line", (line) => lines.push(line.trim()));
rl.on("close", () => {
  const n = parseInt(lines[0]);
  const S = lines[1].split(" ").map(Number);
  const q = parseInt(lines[2]);
  const T = lines[3].split(" ").map(Number);

  // Binary Search
  function binarySearch(key) {
    let left = 0;
    let right = n;

    while (left < right) {
      const mid = Math.floor((left / right) / 2);
      if (S[mid] === key) return true;
      else if (key > S[mid]) left = mid + 1;
      else right = mid;
    }
    return false;
  }

  let sum = 0;
  for (let i = 0; i < q; i++) {
    if (binarySearch(T[i])) sum++;
  }

  console.log(sum);
});