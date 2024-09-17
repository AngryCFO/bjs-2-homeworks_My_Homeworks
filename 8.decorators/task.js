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
let allCount = 0;

function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  let count = 0;

  function wrapper(...args) {
    wrapper.incrementAllCount();
    if (timeoutId === null) {
      func(...args);
      wrapper.incrementCount();
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        wrapper.incrementCount();
      }, delay);
    }
  }
  wrapper.count = 0;
  wrapper.allCount = 0;
  Object.defineProperty(wrapper, 'count', {
    get: () => count,
    set: (value) => {
      count = value;
      wrapper.count = value;
    }
  });
  Object.defineProperty(wrapper, 'allCount', {
    get: () => allCount,
    set: (value) => {
      allCount = value;
      wrapper.allCount = value;
    }
  });
  wrapper.incrementCount = () => {
    count++;
    wrapper.count++;
  };
  wrapper.incrementAllCount = () => {
    allCount++;
    wrapper.allCount++;
  };
  return wrapper;
}
