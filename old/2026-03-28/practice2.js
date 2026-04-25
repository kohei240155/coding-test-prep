const LEN = 100005;

const Q = new Array(LEN);
let head, tail;

function enqueue(x) {
  Q[tail] = x;
  tail = (tail + 1) % LEN;
}

function dequeue() {
  const x = Q[head];
  head = (head + 1) % LEN;
  return x;
}

const input = `5 100
p1 150
p2 80
p3 200
p4 350
p5 20`;

const lines = input.split("\n");
const [n, q] = lines[0].split(" ").map(Number);

for (let i = 1; i <= n; i++) {
  const parts = lines[i].split(" ");
  Q[i] = { name: parts[0], t: Number(parts[1]) };
}

head = 1;
tail = n + 1;

let elaps = 0;

while (head !== tail) {
  const u = dequeue();
  const c = Math.min(q, u.t);
  u.t -= c;
  elaps += c;

  if (u.t > 0) {
    enqueue(u);
  } else {
    console.log(`${u.name} ${elaps}`);
  }
}