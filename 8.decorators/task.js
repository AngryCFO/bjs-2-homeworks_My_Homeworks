//Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = md5(args);
    let objectInCache = cache.find((item) => item.hash === hash);

    if (objectInCache) {
      console.log("Из кеша: " + objectInCache.value);
      return "Из кеша: " + objectInCache.value;
    }

    let result = func(...args);
    cache.push({ hash, value: result });
    if (cache.length > 5) {
      cache.shift();
    }
    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }
  return wrapper;
}


//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  let count = 0;
  let allCount = 0;

  function wrapper(...args) {
    allCount++;
    if (timeoutId === null) {
      func(...args);
      count++;
    } else {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, delay);
  }

  wrapper.getCount = function() {
    return count;
  };

  wrapper.getAllCount = function() {
    return allCount;
  };

  return wrapper;
}
