//Задача № 1
function cachingDecoratorNew(func) {
  const cache = new Map();

  function wrapper(...args) {
    const hash = md5(JSON.stringify(args));
    if (cache.has(hash)) {
      console.log("Из кеша: " + cache.get(hash));
      return "Из кеша: " + cache.get(hash);
    }

    const result = func(...args);
    cache.set(hash, result);

    if (cache.size > 5) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
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
    allCallCount++;

    const callFunction = () => {
      callCount++;
      func(...args);
    };

    if (immediate && !timeoutId) {
      callFunction();
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(callFunction, delay);

    return wrapper;
  }

  // Методы для получения количества вызовов
  wrapper.count = () => callCount;
  wrapper.allCount = () => allCallCount;

  return wrapper;
}
