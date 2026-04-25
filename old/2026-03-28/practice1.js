const values = "1 2 + 3 4 - *";

const stack = new Array(1000);

let top = 0;

function pop() {
  return stack[top--];
}

function push(num) {
  stack[++top] = num;
}

const tokens = values.split(' ');

for (const token of tokens) {
  if (token === '+') {
    const a = pop();
    const b = pop();
    push(a + b);
  } else if (token === '-') {
    const a = pop();
    const b = pop();
    push(b - a);
  } else if (token === '*') {
    const a = pop();
    const b = pop();
    push(a * b);
  } else {
    push(parseInt(token, 10));
  }
}

console.log(pop());