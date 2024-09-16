class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }
    if (typeof callback !== 'function') {
      throw new Error('Колбэк должен быть функцией');
    }
    this.alarmCollection.push({ time, callback, canCall: true });
  }

  removeClock(time) {
    const initialLength = this.alarmCollection.length;
    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    return initialLength - this.alarmCollection.length;
  }

  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.alarmCollection.forEach(alarm => {
          if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) {
            alarm.canCall = false;
            alarm.callback();
          }
        });
      }, 1000);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }

  resetAllCalls() {
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }
}
