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

  wrapper.count = () => count;
  wrapper.allCount = () => allCount;

  return wrapper;
}

const sendSignal = (signalOrder, delay) => console.log("Сигнал отправлен", signalOrder, delay);
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);

setTimeout(() => upgradedSendSignal(1, 0));
setTimeout(() => upgradedSendSignal(2, 300), 300);
setTimeout(() => upgradedSendSignal(3, 900), 900);
setTimeout(() => upgradedSendSignal(4, 1200), 1200);
setTimeout(() => upgradedSendSignal(5, 2300), 2300);
setTimeout(() => upgradedSendSignal(6, 4400), 4400);
setTimeout(() => upgradedSendSignal(7, 4500), 4500);

setTimeout(() => {
  console.log(upgradedSendSignal.count()); // было выполнено 3 отправки сигнала
  console.log(upgradedSendSignal.allCount()); // было выполнено 7 вызовов декорированной функции
}, 7000)
