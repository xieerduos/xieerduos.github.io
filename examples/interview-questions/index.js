// 例1：
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 例2：
// 输入： nums = [3,2,4], target = 6
// 输出： [1,2]

// 例3：
// 输入： nums = [3,3], target = 6
// 输出： [0,1]

const twoSum = (nums, target) => {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    // 因为同一元素不允许重复出现，所以从i的下一位开始遍历
    for (let j = i + 1; j < len; j++) {
      // find the answer, return
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

// var twoSum = function (nums, target) {
//   const map = new Map();
//   for (let i = 0, len = nums.length; i < len; i++) {
//     // 一层遍历，用 target 减去每一项，在 map 的 key 中寻找
//     if (map.has(target - nums[i])) {
//       // 存在则返回结果
//       return [map.get(target - nums[i]), i];
//     }
//     // 不存在，则设置 map key 和 val
//     map.set(nums[i], i);
//   }
//   return [];
// };

const result1 = twoSum([-1, 3, 2, 7, 11, 15], 9);
console.log('result1', result1);

const result2 = twoSum([3, 2, 4], 6);
console.log('result2', result2);

const result3 = twoSum([3, 3], 6);
console.log('result3', result3);
