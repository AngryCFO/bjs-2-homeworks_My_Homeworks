//Задача № 1
function cachingDecoratorNew(func) {
  let cache = []; // Кеш для хранения последних пяти значений

  function wrapper(...args) {
    const hash = md5(JSON.stringify(args)); // Хешируем аргументы
    const objectInCache = cache.find(item => item.hash === hash);

    if (objectInCache) {
      console.log("Из кеша: " + objectInCache.value); // Используем значение из кеша
      return "Из кеша: " + objectInCache.value;
    }

    let result = func(...args); // Вычисляем результат
    cache.push({ hash: hash, value: result }); // Добавляем новый элемент в кеш
    if (cache.length > 5) {
      cache.shift(); // Удаляем самый старый элемент из кеша
    }
    console.log("Вычисляем: " + result); // Выводим вычисленный результат
    return "Вычисляем: " + result;
  }

  return wrapper;
}

//Пример использования:
const addAndMultiply = (a, b, c) => (a + b) * c;
const upgraded = cachingDecoratorNew(addAndMultiply);

console.log(upgraded(1, 2, 3)); // вычисляем: 9
console.log(upgraded(1, 2, 3)); // из кеша: 9
console.log(upgraded(2, 2, 3)); // вычисляем: 12
console.log(upgraded(3, 2, 3)); // вычисляем: 15
console.log(upgraded(4, 2, 3)); // вычисляем: 18
console.log(upgraded(5, 2, 3)); // вычисляем: 21
console.log(upgraded(6, 2, 3)); // вычисляем: 24 (при этом кеш для 1, 2, 3 уничтожается)
console.log(upgraded(1, 2, 3)); // вычисляем: 9  (снова вычисляем, кеша нет)


//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null; // Идентификатор таймера
  let callCount = 0; // Количество вызовов функции
  let allCallCount = 0; // Общее количество вызовов декоратора

  function wrapper(...args) {
    allCallCount++; // Увеличиваем количество вызовов декоратора

    if (timeoutId === null) {
      func(...args); // Немедленный вызов функции
      callCount++; // Увеличиваем количество вызовов функции
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args); // Отложенный вызов функции
      callCount++; // Увеличиваем количество вызовов функции
    }, delay);
  }

  wrapper.count = () => callCount; // Возвращаем количество вызовов функции
  wrapper.allCount = () => allCallCount; // Возвращаем общее количество вызовов декоратора

  return wrapper;
}


//Пример использования:
const sendSignal = (signalOrder, delay) => console.log("Сигнал отправлен", signalOrder, delay);
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);

setTimeout(() => upgradedSendSignal(1, 0), 0); // Сигнал отправлен + будет запланирован асинхронный запуск
setTimeout(() => upgradedSendSignal(2, 300), 300); // проигнорировано, так как следующий сигнал отменит предыдущий
setTimeout(() => upgradedSendSignal(3, 900), 900); // проигнорировано, так как следующий сигнал отменит предыдущий
setTimeout(() => upgradedSendSignal(4, 1200), 1200); // проигнорировано, так как следующий сигнал отменит предыдущий
setTimeout(() => upgradedSendSignal(5, 2300), 2300); // Сигнал отправлен
setTimeout(() => upgradedSendSignal(6, 4400), 4400); // проигнорировано, так как следующий сигнал отменит предыдущий
setTimeout(() => upgradedSendSignal(7, 4500), 4500); // Сигнал будет отправлен

setTimeout(() => {
  console.log(upgradedSendSignal.count()); // Количество вызовов функции
  console.log(upgradedSendSignal.allCount()); // Общее количество вызовов декоратора
}, 7000);

