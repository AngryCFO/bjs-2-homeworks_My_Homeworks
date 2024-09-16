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

// Экспортируем функции и классы, чтобы они были доступны для тестов
if (typeof module !== 'undefined') {
  module.exports = {
    parseCount,
    validateCount,
    Triangle,
    getTriangle
  };
}
