"use strict";

// Задача 1: Решение квадратных уравнений
function solveEquation(a, b, c) {
  const discriminant = b ** 2 - 4 * a * c;
  
  if (discriminant < 0) {
    return [];
  } else if (discriminant === 0) {
    return [-b / (2 * a)];
  } else {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [x1, x2];
  }
}

// Задача 2: Калькулятор ипотеки
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  // Преобразование входных данных в числа
  percent = Number(percent);
  contribution = Number(contribution);
  amount = Number(amount);
  countMonths = Number(countMonths);

  // Проверка валидности входных данных
  if (isNaN(percent) || isNaN(contribution) || isNaN(amount) || isNaN(countMonths)) {
    return false;
  }

  // Расчет месячной процентной ставки
  const monthlyRate = percent / 100 / 12;

  // Расчет тела кредита
  const creditBody = amount - contribution;

  // Если первоначальный взнос больше или равен сумме кредита
  if (creditBody <= 0) {
    return 0;
  }

  // Расчет ежемесячного платежа
  const monthlyPayment = creditBody * (monthlyRate + (monthlyRate / (((1 + monthlyRate) ** countMonths) - 1)));

  // Расчет общей суммы
  const totalAmount = monthlyPayment * countMonths + contribution;

  // Округление до двух знаков после запятой
  return Number(totalAmount.toFixed(2));
}

// Примеры использования
console.log(solveEquation(1, -3, 2));  // [2, 1]
console.log(solveEquation(1, 2, 1));   // [-1]
console.log(solveEquation(1, 1, 1));   // []

console.log(calculateTotalMortgage(10, 0, 50000, 12));       // 52749.53
console.log(calculateTotalMortgage(10, 1000, 50000, 12));    // 51694.54
console.log(calculateTotalMortgage(10, 0, 20000, 24));       // 22149.56
console.log(calculateTotalMortgage(10, 1000, 20000, 24));    // 21042.09
console.log(calculateTotalMortgage(10, 20000, 20000, 24));   // 0
console.log(calculateTotalMortgage(10, 0, 10000, 36));       // 11616.19
console.log(calculateTotalMortgage(15, 0, 10000, 36));       // 12479.52
