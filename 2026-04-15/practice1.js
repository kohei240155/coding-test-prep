/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (target === nums[mid]) {
      return mid;
    } else if (target < nums[mid]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};