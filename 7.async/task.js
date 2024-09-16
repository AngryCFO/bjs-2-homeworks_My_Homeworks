class AlarmClock {
  constructor() {
    this.alarmCollection = new Map();
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    if (this.alarmCollection.has(time)) {
      console.warn('Уже присутствует звонок на это же время');
      return;
    }

    this.alarmCollection.set(time, {
      callback: callback,
      canCall: true
    });
  }

  removeClock(time) {
    this.alarmCollection.delete(time);
  }

  getCurrentFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  async start() {
    if (this.intervalId !== null) {
      return; // Интервал уже запущен
    }

    while (true) {
      const currentTime = this.getCurrentFormattedTime();
      for (const [time, clock] of this.alarmCollection) {
        if (time === currentTime && clock.canCall) {
          clock.canCall = false;
          await new Promise(resolve => clock.callback(resolve));
        }
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    for (const clock of this.alarmCollection.values()) {
      clock.canCall = true;
    }
  
