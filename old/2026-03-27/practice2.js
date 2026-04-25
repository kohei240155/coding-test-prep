/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];

  for (const token of tokens) {
    if (token === '+') {
      const a = stack.pop();
      const b = stack.pop();
      stack.push(a + b);
    } else if (token === '-') {
      const a = stack.pop();
      const b = stack.pop();
      stack.push(b - a);
    } else if (token === '*') {
      const a = stack.pop();
      const b = stack.pop();
      stack.push(a * b);
    } else if (token === '/') {
      const a = stack.pop();
      const b = stack.pop();
      stack.push(Math.trunc(b / a));
    } else {
      stack.push(parseInt(token, 10));
    }
  }
  return stack.pop();
};