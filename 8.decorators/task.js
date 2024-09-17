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

    return wrapper;
  };

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
}

describe("Домашнее задание к занятию 8 «Функции декораторы» > Задача №2 Усовершенствованный декоратор отложенного вызова", () => {
  it("Декоратор выполняет первый синхронный вызов функции", () => {
    let hasCalled = false;
    const functionToDecorate = () => {
      console.log("тук тук");
      hasCalled = !hasCalled;
    };
    const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
    decoratedFunction(1, 2, 3);
    expect(hasCalled).toBe(true);
  });

  it("Декоратор выполнит второй вызов асинхронно функции", (done) => {
    let hasCalled = false;
    const functionToDecorate = () => {
      console.log("тук тук");
      hasCalled = !hasCalled;
    };
    const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
    decoratedFunction(1, 2, 3);
    expect(hasCalled).toBe(true);

    decoratedFunction(1, 2, 3);
    expect(hasCalled).toBe(true);

    setTimeout(() => {
      expect(hasCalled).toBe(false);
      done();
    }, 150);
  });

  it("Декоратор считает общее количество вызовов функции", () => {
    const functionToDecorate = () => console.log("тук тук");
    const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
    expect(decoratedFunction.allCount).toBe(0);
    decoratedFunction(1, 2, 3);
    expect(decoratedFunction.allCount).toBe(1);

    decoratedFunction(1, 2, 3);
    expect(decoratedFunction.allCount).toBe(2);
  });

  it("Декоратор считает количество вызовов переданной функции", (done) => {
    const functionToDecorate = () => console.log("тук тук");
    const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
    expect(decoratedFunction.count).toBe(0);
    decoratedFunction(1, 2, 3);
    expect(decoratedFunction.count).toBe(1);

    decoratedFunction(1, 2, 3);
    expect(decoratedFunction.count).toBe(1);

    setTimeout(() => {
      decoratedFunction(1, 2, 3);
      expect(decoratedFunction.count).toBe(2);
    }, 150);

    setTimeout(() => {
      decoratedFunction(1, 2, 3);
      expect(decoratedFunction.count).toBe(2);
    }, 200);

    setTimeout(() => {
      decoratedFunction(1, 2, 3);
      expect(decoratedFunction.count).toBe(3);
      expect(decoratedFunction.allCount).toBe(5);
      done();
    }, 400);
  });
});
