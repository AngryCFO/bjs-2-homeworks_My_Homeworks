// Задача 1: Форматтер чисел

function parseCount(value) {
  const parsedValue = Number.parseFloat(value);
  if (isNaN(parsedValue)) {
    throw new Error("Невалидное значение");
  }
  return parsedValue;
}

function validateCount(value) {
  try {
    return parseCount(value);
  } catch (error) {
    return error;
  }
}

// Задача 2: Треугольник

class Triangle {
  constructor(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error("Треугольник с такими сторонами не существует");
    }
    this.a = a;
    this.b = b;
    this.c = c;
  }

  get perimeter() {
    return this.a + this.b + this.c;
  }

  get area() {
    const p = this.perimeter / 2;
    return Number((Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c))).toFixed(3));
  }
}

function getTriangle(a, b, c) {
  try {
    return new Triangle(a, b, c);
  } catch (error) {
    return {
      get area() {
        return "Ошибка! Треугольник не существует";
      },
      get perimeter() {
        return "Ошибка! Треугольник не существует";
      }
    };
  }
}

// Примеры использования
// Задача 1
console.log(parseCount("123")); // Должно вернуть 123
console.log(validateCount("123")); // Должно вернуть 123
console.log(validateCount("12.3")); // Должно вернуть 12.3
console.log(validateCount("abc")); // Должно вернуть ошибку

// Задача 2
console.log(new Triangle(3, 4, 5).area); // Должно вернуть площадь
console.log(new Triangle(3, 4, 5).perimeter); // Должно вернуть периметр
console.log(getTriangle(1, 1, 3).area); // Должно вернуть "Ошибка! Треугольник не существует"
console.log(getTriangle(2, 3, 4).area); // Должно вернуть площадь﻿
