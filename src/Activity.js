class Activity {
  constructor(activityData, currentUser) {
    this.userActivityData = activityData;
    this.user = currentUser;
    this.userActivity = this.buildUserActivityData();
  }

  buildUserActivityData() {
    return this.userActivityData.filter(user => user.userID === this.user.id);
  }

  returnMilesWalked() {
    let totalSteps = 0;
    this.userActivity.forEach((day, i) => {
      totalSteps = totalSteps + day.numSteps;
    });
    const totalDiatance = totalSteps * this.user.strideLength;
    const milesWalked = totalDiatance / 5280;
    return milesWalked.toFixed(2)
  }

  returnActiveMinutes(selectedDate) {
    const daySelected = this.userActivity.find(day => day.date === selectedDate);
    return daySelected.minutesActive;
  }

  returnWeeklyAverageMinutes(startDate) {
    let findStartingDate;
    this.userActivity.forEach((day, i) => {
      if (day.date === startDate) {
        findStartingDate = i;
      }
    });

    let day7 = this.userActivity[findStartingDate + 6];
    let day6 = this.userActivity[findStartingDate + 5];
    let day5 = this.userActivity[findStartingDate + 4];
    let day4 = this.userActivity[findStartingDate + 3];
    let day3 = this.userActivity[findStartingDate + 2];
    let day2 = this.userActivity[findStartingDate + 1];
    let day1 = this.userActivity[findStartingDate];
    if (day7) {
    const average = [day7.minutesActive + day6.minutesActive + day5.minutesActive + day4.minutesActive + day3.minutesActive + day2.minutesActive + day1.minutesActive] / 7;
    return Math.round(average);
  } else {
    return "Please select a valid week"
    }
  }

  calculateStepGoalMet(selectedDate) {
    const daySelected = this.userActivity.find(day => day.date === selectedDate);
    if (this.user.dailyStepGoal <= daySelected.numSteps) {
      return 'You Met Your Daily Step Goal'
    } else {
      return 'You Did Not Meet Your Daily Step Goal'
    }
  }

  findStepGoalExceeded() {
     const stepGoalExceededDays = [];
     this.userActivity.forEach((day, i) => {
       if (this.user.dailyStepGoal < day.numSteps) {
         stepGoalExceededDays.push(day.date);
       }
     });
     return stepGoalExceededDays;
  }

  returnStairClimbingRecord() {
    return this.userActivity.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs).shift().flightsOfStairs;
  }

  returnAverageStairsClimbed(selectedDate) {
    let totalStairsClimbed = 0;
    const selectedDateData = this.userActivityData.filter(data => data.date === selectedDate);
    selectedDateData.forEach((user, i) => {
      totalStairsClimbed = totalStairsClimbed + user.flightsOfStairs;
    });
    return Math.round(totalStairsClimbed / selectedDateData.length);
  }

  returnAverageStepsTaken(selectedDate) {
    let totalStepsTaken = 0;
    const selectedDateData = this.userActivityData.filter(data => data.date === selectedDate);
    selectedDateData.forEach((user, i) => {
      totalStepsTaken = totalStepsTaken + user.numSteps;
    });
    return Math.round(totalStepsTaken / selectedDateData.length);
  }

  returnAverageActiveMinutes(selectedDate) {
    let totalActiveMinutes = 0;
    const selectedDateData = this.userActivityData.filter(data => data.date === selectedDate);
    selectedDateData.forEach((user, i) => {
      totalActiveMinutes = totalActiveMinutes+ user.minutesActive;
    });
    return Math.round(totalActiveMinutes / selectedDateData.length);
  }

}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
