/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  let count = {};

  for (const n of s) {
    count[n] = (count[n] || 0) + 1;
  }

  for (const n of t) {
    count[n] = (count[n] || 0) - 1;
    if (count[n] < 0) return false;
  }
  return true;
};