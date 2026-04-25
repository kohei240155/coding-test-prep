/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  const count = {};

  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  let length = 0;

  for (const key in count) {
    length += Math.floor(count[key] / 2) * 2;
  }

  if (length < s.length) {
    length++;
  }

  return length;
};