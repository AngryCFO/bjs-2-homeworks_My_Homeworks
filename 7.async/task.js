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
    return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
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
      this.alarmCollection.forEach(alarm => {
        if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resetAllCalls() {
    if (this.alarmCollection.length === 0) {
      console.warn('Коллекция звонков пуста');
      return;
    }

    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }

clearAlarms() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
  this.alarmCollection = this.alarmCollection.map(alarm => ({ ...alarm, canCall: true }));
  this.alarmCollection = [];
  this.intervalId = null;
}

}

//Пример использования:
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
