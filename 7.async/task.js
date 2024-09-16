class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    // Проверка на дублирование времени
    if (this.alarmCollection.some(clock => clock.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
      return;
    }

    // Добавление нового звонка
    this.alarmCollection.push({
      time: time,
      callback: callback,
      canCall: true
    });
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(clock => clock.time !== time);
  }

  getCurrentFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  start() {
    if (this.intervalId !== null) {
      return; // Интервал уже запущен
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();
      this.alarmCollection.forEach(clock => {
        if (clock.time === currentTime && clock.canCall) {
          clock.canCall = false; // Устанавливаем canCall в false
          clock.callback(); // Вызываем коллбек
        }
      });
    }, 1000); // Проверяем каждую секунду
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach(clock => {
      clock.canCall = true;
    });
  }

  clearAlarms() {
    this.stop(); // Останавливаем интервал
    this.alarmCollection = []; // Очищаем коллекцию звонков
  }
}

// Пример использования:
const alarmClock = new AlarmClock();

alarmClock.addClock('08:00', () => console.log('Просыпайся!'));
alarmClock.addClock('09:00', () => console.log('Время на пару!'));

console.log(alarmClock.getCurrentFormattedTime()); // Выводит текущее время в формате HH:MM

alarmClock.start(); // Запускает будильник

// Через некоторое время, можно остановить будильник и очистить все звонки
setTimeout(() => {
  alarmClock.stop();
  alarmClock.clearAlarms();
}, 60000); // Останавливаем и очищаем через 1 минуту
