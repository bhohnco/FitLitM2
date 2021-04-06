class Hydration {
  constructor(hydrationData, id) {
    this.data = hydrationData;
    this.id = id;
    this.user = this.buildUserHydrationData();
  }

  buildUserHydrationData() {
    return this.data.filter(user => user.userID === this.id);
  }

  calculateAverageOunces() {
    const totalOz = this.user.reduce((ozTotal, currentUser) => {
      ozTotal += currentUser.numOunces;
      return ozTotal
    }, 0)
    return Math.floor(totalOz / this.user.length);
  }

  calculateDailyOunces(date) {
    const daySelected = this.user.find(day => day.date === date);
    return daySelected.numOunces;
  }

  calculateWeeklyOz(startDate) {
    let findStartingDate;
    this.user.forEach((day, i) => {
      if (day.date === startDate) {
        findStartingDate = i;
      }
    });

    let day7 = this.user[findStartingDate + 6];
    let day6 = this.user[findStartingDate + 5];
    let day5 = this.user[findStartingDate + 4];
    let day4 = this.user[findStartingDate + 3];
    let day3 = this.user[findStartingDate + 2];
    let day2 = this.user[findStartingDate + 1];
    let day1 = this.user[findStartingDate];
    if (day7) {
    return [[day1.numOunces, day2.numOunces, day3.numOunces, day4.numOunces, day5.numOunces, day6.numOunces, day7.numOunces],
    [day1.date, day2.date, day3.date, day4.date, day5.date, day6.date, day7.date]];
  } else {
    return "Please select a valid week"
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
