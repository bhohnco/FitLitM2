class Activity {
  constructor(activityData, currentUser) {
    this.userActivityData = activityData;
    this.user = currentUser;
    this.userActivity = this.buildUserActivityData();
  }

  buildUserActivityData() {
    return this.userActivityData.filter(user => user.userID === this.user.id);
  }

  returnStepsTaken(selectedDate) {
    const daySelected = this.userActivity.find(day => day.date === selectedDate);
    return daySelected.numSteps;
  }

  returnStairsClimbed(selectedDate) {
    const daySelected = this.userActivity.find(day => day.date === selectedDate);
    return daySelected.flightsOfStairs;
  }

  returnMilesWalked(selectedDate) {
    const daySelected = this.userActivity.find(day => day.date === selectedDate);
    const totalDiatance = daySelected.numSteps * this.user.strideLength;
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
    const average = [day1.minutesActive + day2.minutesActive + day3.minutesActive + day4.minutesActive + day5.minutesActive + day6.minutesActive + day7.minutesActive] / 7;
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

  generateActivityInfoByWeek(startDate) {
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
    let day1 = this.userActivity[findStartingDate]
    if (day7) {
      return [[day1.date, day2.date, day3.date, day4.date,
        day5.date, day6.date, day7.date],[day1.numSteps, day2.numSteps, day3.numSteps, day4.numSteps,
        day5.numSteps, day6.numSteps, day7.numSteps],
        [day1.flightsOfStairs, day2.flightsOfStairs, day3.flightsOfStairs, day4.flightsOfStairs,
          day5.flightsOfStairs, day6.flightsOfStairs, day7.flightsOfStairs],
          [day1.minutesActive, day2.minutesActive, day3.minutesActive, day4.minutesActive,
            day5.minutesActive, day6.minutesActive, day7.minutesActive]];
    } else {
      return 'Please select a valid week'
    }
  }

}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
