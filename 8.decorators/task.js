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
function debounceDecoratorNew(fn, delay) {
  let timeoutId;
  let isFirstCall = true;
  let callCount = 0;
  let allCallCount = 0;

  const wrapper = (...args) => {
    allCallCount++;

    if (isFirstCall) {
      isFirstCall = false;
      fn.apply(this, args);
      callCount++;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        callCount++;
        wrapper.count = callCount;
        wrapper.allCount = allCallCount;
      }, delay);
    }

    wrapper.count = callCount;
    wrapper.allCount = allCallCount;

    return wrapper;
  };

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
}
