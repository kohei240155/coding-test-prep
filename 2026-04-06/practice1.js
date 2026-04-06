/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let rightIdx = 0;
  let leftIdx = s.length - 1;

  while (rightIdx < leftIdx) {
    while (rightIdx < leftIdx && !/[A-Z0-9a-z]/.test(s[rightIdx])) {
      rightIdx++;
    }
    while (rightIdx < leftIdx && !/[A-Z0-9a-z]/.test(s[leftIdx])) {
      leftIdx--;
    }

    if (s[rightIdx].toLowerCase() !== s[leftIdx].toLowerCase()) {
      return false;
    }

    rightIdx++;
    leftIdx--;
  }

  return true;
};