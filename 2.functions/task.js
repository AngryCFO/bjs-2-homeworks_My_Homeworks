// Задача 1
function getArrayParams(...arr) {
  if (arr.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }

  let min = arr[0];
  let max = arr[0];
  let sum = 0;

  for (let num of arr) {
    if (num < min) min = num;
    if (num > max) max = num;
    sum += num;
  }

  const avg = Number((sum / arr.length).toFixed(2));

  return { min, max, avg };
}

// Задача 2
function summElementsWorker(...arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, num) => sum + num, 0);
}

function differenceMaxMinWorker(...arr) {
  if (arr.length === 0) return 0;
  return Math.max(...arr) - Math.min(...arr);
}

function differenceEvenOddWorker(...arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((diff, num) => num % 2 === 0 ? diff + num : diff - num, 0);
}

function averageEvenElementsWorker(...arr) {
  if (arr.length === 0) return 0;
  const evenNums = arr.filter(num => num % 2 === 0);
  if (evenNums.length === 0) return 0;
  return evenNums.reduce((sum, num) => sum + num, 0) / evenNums.length;
}

// Задача 3
function makeWork(arrOfArr, func) {
  let maxWorkerResult = -Infinity;

  for (let arr of arrOfArr) {
    const result = func(...arr);
    if (result > maxWorkerResult) {
      maxWorkerResult = result;
    }
  }

  return maxWorkerResult;
}

// Тесты
console.log("Задача 1:");
console.log(getArrayParams(-99, 99, 10));
console.log(getArrayParams(1, 2, 3, -100, 10));
console.log(getArrayParams(5));

console.log("\nЗадача 2:");
console.log("summElementsWorker:", summElementsWorker());
console.log("summElementsWorker:", summElementsWorker(10, 10, 11, 20, 10));

console.log("differenceMaxMinWorker:", differenceMaxMinWorker());
console.log("differenceMaxMinWorker:", differenceMaxMinWorker(10, 10, 11, 20, 10));

console.log("differenceEvenOddWorker:", differenceEvenOddWorker(94, 51, 57, 41, 47, 66, 58, 10, 38, 17));
console.log("differenceEvenOddWorker:", differenceEvenOddWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35));

console.log("averageEvenElementsWorker:", averageEvenElementsWorker(1, 2, 3, 4, 5, 6, 7, 8, 9));
console.log("averageEvenElementsWorker:", averageEvenElementsWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35));

console.log("\nЗадача 3:");
const arr = [[10, 10, 11, 20, 10], [67, 10, 2, 39, 88], [72, 75, 51, 87, 43], [30, 41, 55, 96, 62]];
console.log("makeWork с summElementsWorker:", makeWork(arr, summElementsWorker));
console.log("makeWork с differenceMaxMinWorker:", makeWork(arr, differenceMaxMinWorker));
console.log("makeWork с differenceEvenOddWorker:", makeWork(arr, differenceEvenOddWorker));
console.log("makeWork с averageEvenElementsWorker:", makeWork(arr, averageEvenElementsWorker));
