// Задача 3. Журнал успеваемости
class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark >= 2 && mark <= 5) {
      if (!this.marks[subject]) {
        this.marks[subject] = [];
      }
      this.marks[subject].push(mark);
    }
  }

  getAverageBySubject(subject) {
    if (!this.marks[subject]) {
      return 0;
    }
    const sum = this.marks[subject].reduce((acc, mark) => acc + mark, 0);
    return sum / this.marks[subject].length;
  }

 getAverage() {
  const subjects = Object.keys(this.marks);
  if (subjects.length === 0) {
    return 0;
  }
  const sum = subjects.reduce((acc, subject) => acc + this.getAverageBySubject(subject), 0);
  return sum / subjects.length;
}
}
