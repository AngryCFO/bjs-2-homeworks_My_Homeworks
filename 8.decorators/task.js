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
      }, delay);
    }

    wrapper.count = callCount;
    wrapper.allCount = allCallCount;

    return wrapper;
  };

  return wrapper;
}

const sendSignal = (signalOrder, delay) => console.log("Сигнал отправлен", signalOrder, delay);
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);

setTimeout(() => upgradedSendSignal(1, 0)); // Сигнал отправлен 1 0
setTimeout(() => upgradedSendSignal(2, 300), 300); // проигнорировано
setTimeout(() => upgradedSendSignal(3, 900), 900); // проигнорировано
setTimeout(() => upgradedSendSignal(4, 1200), 1200); // проигнорировано
setTimeout(() => upgradedSendSignal(5, 2300), 2300); // Сигнал отправлен 5 2300
setTimeout(() => upgradedSendSignal(6, 4400), 4400); // проигнорировано
setTimeout(() => upgradedSendSignal(7, 4500), 4500); // Сигнал отправлен 7 4500

setTimeout(() => {
  console.log(upgradedSendSignal.count); // 3
  console.log(upgradedSendSignal.allCount); // 6
}, 7000);
