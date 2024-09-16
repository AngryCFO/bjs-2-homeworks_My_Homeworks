class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
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
    const existingAlarm = this.alarmCollection.find(alarm => alarm.time === time);
    if (existingAlarm) {
      console.warn('Уже присутствует звонок на это же время');
    }
    const newAlarm = { time, callback, canCall: true, id: id || Date.now().toString() };
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
    if (this.intervalId) {
      console.warn('Будильник уже запущен');
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
          try {
            alarm.callback();
          } catch (error) {
            console.error(`Ошибка при выполнении колбэка для будильника ${alarm.id}:`, error);
          }
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    } else {
      console.warn('Будильник не запущен');
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    // Вместо очистки коллекции, устанавливаем canCall в false для всех будильников
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = false;
    });
  }

  printAlarms() {
    console.log('Текущие будильники:');
    this.alarmCollection.forEach(alarm => {
      console.log(`ID: ${alarm.id}, Время: ${alarm.time}, Может быть вызван: ${alarm.canCall}`);
    });
  }
}

// Пример использования:
const alarmClock = new AlarmClock();
const morningAlarmId = alarmClock.addClock('08:00', () => console.log('Пора вставать!'), 'morning');
const lunchAlarmId = alarmClock.addClock('12:00', () => console.log('Время обеда!'), 'lunch');
alarmClock.start();

// Чтобы остановить будильник
// alarmClock.stop();

// Чтобы сбросить возможность запуска всех звонков
// alarmClock.resetAllCalls();

// Чтобы удалить конкретный будильник
// alarmClock.removeClock(morningAlarmId);

// Чтобы очистить все звонки (установить canCall в false)
// alarmClock.clearAlarms();

// Чтобы вывести все текущие будильники
// alarmClock.printAlarms();
