const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

rl.on("line", (line) => lines.push(line.trim()));
rl.on("close", () => {
  const n = parseInt(lines[0]);
  const S = lines[1].split(" ").map(Number);
  const q = parseInt(lines[2]);
  const T = lines[3].split(" ").map(Number);

  function search(A, n, key) {
    A[n] = key;
    let i = 0;
    while (A[i] !== key) i++;
    return i !== n;
  }

  let sum = 0;
  for (let i = 0; i < q; i++) {
    if (search(S, n, T[i])) sum++;
  }

  console.log(sum);
});