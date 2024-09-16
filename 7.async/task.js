class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.timerId = null;
  }

  addClock(time, callback, id) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }
    if (typeof callback !== 'function') {
      throw new Error('Колбэк должен быть функцией');
    }
    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      throw new Error('Неправильный формат времени');
    }
    if (id !== undefined && typeof id !== 'string') {
      throw new Error('id должен быть строкой');
    }
    const existingAlarm = this.alarmCollection.find(alarm => alarm.id === id);
    if (existingAlarm) {
      console.warn('Звонок с таким id уже существует');
      return existingAlarm.id;
    }
    const newAlarm = { time, callback, id: id || Date.now().toString() };
    this.alarmCollection.push(newAlarm);
    return newAlarm.id;
  }

  removeClock(id) {
    const index = this.alarmCollection.findIndex(alarm => alarm.id === id);
    if (index !== -1) {
      this.alarmCollection.splice(index, 1);
      return true;
    }
    return false;
  }

  getCurrentFormattedTime() {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  }

  start() {
    if (this.timerId) {
      return;
    }
    this.timerId = setInterval(() => {
      this.alarmCollection.forEach(alarm => {
        if (alarm.time === this.getCurrentFormattedTime()) {
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  printAlarms() {
    this.alarmCollection.forEach(alarm => {
      console.log(`Будильник №${alarm.id} заведен на ${alarm.time}`);
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}
