class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      throw new Error('Неправильный формат времени');
    }

    const existingAlarm = this.alarmCollection.find(alarm => alarm.time === time);
    if (existingAlarm) {
      console.warn('Уже присутствует звонок на это же время');
      return;
    }

    this.alarmCollection.push({ time, callback, canCall: true });
  }

  removeClock(time) {
    const index = this.alarmCollection.findIndex(alarm => alarm.time === time);
    if (index !== -1) {
      this.alarmCollection.splice(index, 1);
    }
  }

  getCurrentFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  start() {
    if (this.intervalId) {
      return;
    }

    if (this.alarmCollection.length === 0) {
      console.warn('Коллекция звонков пуста');
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();
      this.alarmCollection.forEach(alarm => {
        if (alarm.time === currentTime && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop(); // Останавливаем интервал
    this.alarmCollection = []; // Очистка всех звонков
  }
}

// Пример использования:
const alarmClock = new AlarmClock();

alarmClock.addClock('08:00', () => console.log('Пора вставать!'));
alarmClock.addClock('12:00', () => console.log('Время обеда!'));

alarmClock.start();

// Чтобы остановить будильник
// alarmClock.stop();

// Чтобы сбросить возможность запуска всех звонков
// alarmClock.resetAllCalls();

// Чтобы удалить все звонки
// alarmClock.clearAlarms();
