//Задача № 1
function cachingDecoratorNew(func) {
  let cache = new Map(); // Используем Map вместо массива

  function wrapper(...args) {
    const hash = md5(JSON.stringify(args)); // Хешируем аргументы
    const objectInCache = cache.get(hash);

    if (objectInCache !== undefined) { // Проверяем, есть ли элемент в кеше
      console.log("Из кеша: " + objectInCache);
      return "Из кеша: " + objectInCache;
    }

    let result = func(...args); // Вычисляем результат
    cache.set(hash, result); // Добавляем новый элемент в кеш
    if (cache.size > 5) {
      cache.delete(cache.keys().next().value); // Удаляем самый старый элемент из кеша
    }
    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }

  return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay, immediate = false) {
  let timeoutId = null;
  let callCount = 0;
  let allCallCount = 0;

  function wrapper(...args) {
    allCallCount++; // Увеличиваем общее количество вызовов декоратора

    const callFunction = () => {
      callCount++; // Увеличиваем количество вызовов функции
      func(...args);
    };

    clearTimeout(timeoutId);
    if (immediate && timeoutId === null) {
      callFunction();
    } else {
      timeoutId = setTimeout(callFunction, delay);
    }
  }

  wrapper.count = () => callCount;
  wrapper.allCount = () => allCallCount;

  return wrapper;
}
