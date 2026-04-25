/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  function build(str) {
    const result = [];
    for (const char of str) {
      if (char !== '#') {
        result.push(char);
      } else {
        result.pop();
      }
    }
    return result.join();
  }

  return build(s) === build(t);
};