const userRepository = new UserRepository(userData, User);
const hydration = new Hydration(hydrationData, userRepository.currentUser.id);
const sleep = new Sleep(sleepData, userRepository.currentUser.id);
const activity = new Activity(activityData, userRepository.currentUser);
let selectedDate = '2019/09/22';
let startDate = '2019/09/16';


const userInfoButton = document.getElementById('userinfoButton');
const userInfoDropdown = document.getElementById('userInfoPage');
const userEmail = document.getElementById('userinfoEmail');
const activityHeader = document.getElementById('activityContainer');
const userStepGoal = document.getElementById('userinfoGoal');
const averageStepGoal = document.getElementById('averageStepGoal');
const userNameDisplay = document.getElementById('userName');
const averageOunces = document.getElementById('averageOunces')
const selectedDateHydration = document.getElementById('selectedDateHydration');
const averageHoursSlept = document.getElementById('averageHoursSlept');
const averageSleepQuality = document.getElementById('averageSleepQuality');
const stepsByDay = document.getElementById('stepsByDay');
const activeMinutesByDay = document.getElementById('activeMinutesByDay');
const milesWalkedByDay = document.getElementById('milesWalkedByDay');
const compareStairsClimbed = document.getElementById('compareStairsClimbed');
const stepChartContainer = document.getElementById('stepChartContainer');
const stairChartContainer = document.getElementById('stairChartContainer');
const activeMinutesChartContainer = document.getElementById('activeMinutesChartContainer');
const showSteps = document.getElementById('showSteps');
const showStairs = document.getElementById('showStairs');
const showActiveMinutes = document.getElementById('showActiveMinutes');
const picker = datepicker(document.getElementById('date-picker'), {
  onSelect: (instance, date) => {
    if (date) {
      let stringifiedDateAndTime = JSON.stringify(date);
      let stringifiedDate = stringifiedDateAndTime.split('T')[0];
      let formattedDate = stringifiedDate.replaceAll('-', '/');
      selectedDate = formattedDate.substring(1);
      showHydrationData();
      showSleepData();
      showActivityData();
    }
  },
  startDate: new Date(2019, 8, 1),
  minDate: new Date(2019, 5, 15),
  maxDate: new Date(2019, 8, 22),
})

const start = datepicker(document.getElementById('dateRangePickerStart'), {
  id: 'dateRangePicker',
  startDate: new Date(2019, 8, 1),
  minDate: new Date(2019, 5, 15),
  maxDate: new Date(2019, 8, 22),
  onSelect: (instance, date) => {
    if (date) {
      let stringifiedDateAndTime = JSON.stringify(date);
      let stringifiedDate = stringifiedDateAndTime.split('T')[0];
      let formattedDate = stringifiedDate.replaceAll('-', '/');
      startDate = formattedDate.substring(1);
      showHydrationData();
      showSleepData();
      showActivityData();
    }
  }
});


window.addEventListener('load', displayUserInfo);
userInfoButton.addEventListener('click', showDropdown);
showSteps.addEventListener('click', showStepChart);
showStairs.addEventListener('click', showStairChart);
showActiveMinutes.addEventListener('click', showActiveMinutesChart)



function displayUserInfo() {
  showHydrationData();
  showSleepData();
  showActivityData();
  userNameDisplay.innerText = `Welcome ${userRepository.currentUser.returnFirstName()}`;
  userEmail.innerText = `Email Address: ${userRepository.currentUser.email};`
  userStepGoal.innerText = `Daily Step Goal: ${userRepository.currentUser.dailyStepGoal}`;
  averageStepGoal.innerText = calculateStepGoalDifference();
}

function calculateStepGoalDifference() {
  let averageSteps = userRepository.returnAverageStepGoal();
  let userSteps = userRepository.currentUser.dailyStepGoal;
  let stepDifferece = averageSteps - userSteps;
  if (stepDifferece < 0) {
    return `Your step goal is ${Math.abs(stepDifferece)} steps more than the average user`
  } else if (stepDifferece > 0) {
    return `Your step goal is ${stepDifferece} steps less than the average user`
  } else {
    return 'Your step goal is on par with the average user'
  }
}

function calculateStepDifference() {
  let averageSteps = activity.returnAverageStepsTaken(selectedDate);
  let userSteps = activity.returnStepsTaken(selectedDate);
  let stepDifferece = averageSteps - userSteps;
  if (stepDifferece < 0) {
    return `${Math.abs(stepDifferece)} more than the average user!`
  } else if (stepDifferece > 0) {
    return `${stepDifferece} less than the average user`
  } else {
    return `You took the same amount of steps as the average user`
  }
}

function calculateActiveMinuteDifference() {
  let averageMinutes = activity.returnAverageActiveMinutes(selectedDate);
  let userMinutes = activity.returnActiveMinutes(selectedDate);
  let minuteDifference = averageMinutes - userMinutes;
  if (minuteDifference < 0) {
    return `${Math.abs(minuteDifference)} more than the average user!`
  } else if (minuteDifference > 0) {
    return `${minuteDifference} less than the average user`
  } else {
    return `You were active for the same amount of minutes as the average user`
  }
}

function calculateStairsClimbedDifferece() {
  let averageStairsClimbed = activity.returnAverageStairsClimbed(selectedDate);
  let userStairsClimbed = activity.returnStairsClimbed(selectedDate);
  let stairDifference = averageStairsClimbed - userStairsClimbed;
  if (stairDifference < 0) {
    return `You climbed ${Math.abs(stairDifference)} more flights of stairs than the average user!`
  } else if (stairDifference > 0) {
    return `You climbed ${stairDifference} less filghts of stairs than the average user`
  } else {
    return `You climbed the same amount of stairs as the average user`
  }
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showHydrationData() {
  averageOunces.innerText = `Average Daily water intake: ${hydration.calculateAverageOunces()}`
  selectedDateHydration.innerText = `Intake for ${selectedDate}: ${hydration.calculateDailyOunces(selectedDate)} fl oz`
  if (hydration.calculateWeeklyOz(startDate) === "Please select a valid week") {
    window.alert("Please select a valid week start date")
  } else {
  createHydrationChart(startDate);
  createDayHydrationChart(startDate);
 }
}

function showSleepData() {
  averageHoursSlept.innerText = `Average Hours Slept: ${sleep.calculateAverageHoursSleptPerDay()}`
  averageSleepQuality.innerText = `Average Sleep Quality: ${sleep.calculateAverageSleepQualityPerDay()}`
  if (hydration.calculateWeeklyOz(startDate) !== "Please select a valid week") {
  createDaySleepChart(startDate);
  createSleepChart(startDate);
  }
}

function showActivityData() {
  activityHeader.innerText = `Activity on ${selectedDate}`
  stepsByDay.innerText = `Steps Taken: ${activity.returnStepsTaken(selectedDate)}, thats ${calculateStepDifference()}`
  activeMinutesByDay.innerText = `Minutes Active: ${activity.returnActiveMinutes(selectedDate)}, thats ${calculateActiveMinuteDifference()}`
  milesWalkedByDay.innerText = `Miles Walked: ${activity.returnMilesWalked(selectedDate)}`
  compareStairsClimbed.innerText = calculateStairsClimbedDifferece();
  if (hydration.calculateWeeklyOz(startDate) !== "Please select a valid week") {
  createActivityChart(startDate);
  }
}

function showStepChart() {
  stepChartContainer.classList.remove('hide');
  stairChartContainer.classList.add('hide');
  activeMinutesChartContainer.classList.add('hide');
}

function showStairChart() {
  stepChartContainer.classList.add('hide');
  stairChartContainer.classList.remove('hide');
  activeMinutesChartContainer.classList.add('hide');
}

function showActiveMinutesChart() {
  stepChartContainer.classList.add('hide');
  stairChartContainer.classList.add('hide');
  activeMinutesChartContainer.classList.remove('hide');
}

function createActivityChart(startDate) {
  const stepChart = document.getElementById('stepChart').getContext('2d');
  const stairChart = document.getElementById('stairChart').getContext('2d');
  const minutesChart = document.getElementById('minutesChart').getContext('2d');
  let weeklyActivity = activity.generateActivityInfoByWeek(startDate);
  let stepsTakenChart = new Chart(stepChart, {
    type: 'line',
    data: {
      labels: weeklyActivity[0],
      datasets: [{
        axis: 'y',
        label: 'Steps Taken',
        data: weeklyActivity[1],
        fill: false,
        backgroundColor: '#E90304',
        borderColor: [
          'rgb(145,21,43)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      events:['click'],
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            beginAtZero: true,
            min: 2000,
            max: 20000,
            stepSize: 2500,
            fontColor: '#FFFFFF',
            fontSize: 10,
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "#FFFFFF",
            fontSize: 10,
          }
        }]
      }
    }
  })

  let stairsClimbedChart = new Chart(stairChart, {
    type: 'line',
    data: {
      labels: weeklyActivity[0],
      datasets: [{
        axis: 'y',
        label: 'Stairs Climbed',
        data: weeklyActivity[2],
        fill: false,
        backgroundColor: '#E90304',
        borderColor: [
          'rgb(145,21,43)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      events:['click'],
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 60,
            stepSize: 10,
            fontColor: "#FFFFFF",
            fontSize: 10,
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "#FFFFFF",
            fontSize: 10,
          }
        }]
      }
    }
  })

  let activeMinutesChart = new Chart(minutesChart, {
    type: 'line',
    data: {
      labels: weeklyActivity[0],
      datasets: [{
        axis: 'y',
        label: 'Minutes Active',
        data: weeklyActivity[3],
        fill: false,
        backgroundColor: '#E90304',
        borderColor: [
          'rgb(145,21,43)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      events:['click'],
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 320,
            stepSize: 40,
            fontColor: "#FFFFFF",
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "#FFFFFF",
            fontSize: 10,
          }
        }]
      }
    }
  })
}

function createSleepChart(startDate) {
  const sleepChart = document.getElementById('sleepChart').getContext('2d');
  let weeklyHoursSlept = sleep.generateHoursSleptByWeek(startDate);
  let weeklySleepQuality = sleep.generateSleepQualityByWeek(startDate);
  let sleepDataChart = new Chart(sleepChart, {
    type: 'line',
    beginAtZero: true,
    data:
        {
          labels: weeklyHoursSlept[1],
          datasets: [{
            axis: 'y',
            label: 'Hours Slept',
            data: weeklyHoursSlept,
            data: weeklyHoursSlept[0],
            fill: false,
            backgroundColor: "#914aef",
            borderColor: [
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }, {
            axis: 'y',
            label: 'Sleep Quality',
            data: weeklySleepQuality,
            fill: false,
            backgroundColor: "#ee30e0",
            borderColor: [
              'rgb(153,102,255)'
            ],
            borderWidth: 1
          }, ]
        },
    options: {
      events:['click'],
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 12,
            stepSize: 1,
            fontColor: "#FFFFFF",
            fontSize: 10,
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "#FFFFFF",
            fontSize: 10,
          }
        }]
      }
    }
  })
}

function createDaySleepChart(startDate) {
  const sleepChartDay = document.getElementById('sleepChartDay').getContext('2d');
  let dailyHoursSlept = sleep.calculateHoursSleptByDate(selectedDate);
  let dailySleepQuality = sleep.calculateSleepQualityByDate(selectedDate);
  let sleepDataDayChart = new Chart(sleepChartDay, {
    type: 'bar',
    beginAtZero: true,
    data:
        {
          labels: ["Hours Slept", "Sleep Quality"],
          datasets: [{
            axis: 'y',
            backgroundColor: ["#914AEF", "#ee30e0"],
            data: [dailyHoursSlept, dailySleepQuality],
            fill: false,
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)'
            ],
            borderWidth: 3,
          }, ]
        },
    options: {
      events:['click'],
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 12,
            stepSize: 1,
            fontColor: "#FFFFFF",
            fontSize: 10
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "#FFFFFF",
            fontSize: 10,
          }
        }]
      }
    }
  })
}

function createHydrationChart(startDate) {
  const hydrationChart = document.getElementById('hydrationChart').getContext('2d');
  let weeklyHydration = hydration.calculateWeeklyOz(startDate);
  let hydrationDataChart = new Chart(hydrationChart, {
    type: 'line',
    data: {
      labels: weeklyHydration[1],
      datasets: [{
        axis: 'y',
        label: 'OZ drank',
        data: weeklyHydration,
        data: weeklyHydration[0],
        fill: false,
        backgroundColor: "#0a60f5",
        borderColor: [
          'rgb(75, 192, 192)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      events:['click'],
      responsive: true,
      legend: {
        display: true,
        fontColor: "#ffffff"
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "#FFFFFF",
            fontSize: 10,
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 10,
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "#FFFFFF",
            fontSize: 10,
          }
        }]
      }
    }
  })
}

function createDayHydrationChart(startDate) {
  const hydrationChartDay = document.getElementById('hydrationChartDay').getContext('2d');
  let averageOunces = hydration.calculateAverageOunces(startDate);
  let dailyOunces = hydration.calculateDailyOunces(selectedDate);
  let hydrationDataDayChart = new Chart(hydrationChartDay, {
    type: 'bar',
    beginAtZero: true,
    data:
        {
          labels: ["Average OZ", "OZ on date"],
          datasets: [{
            axis: 'y',
            backgroundColor: ["#206ee3", "#05318c"],
            data: [averageOunces, dailyOunces],
            borderColor: [
              'rgb(99,219,255)',
              'rgb(64,128,255)'
            ],
            borderWidth: 3,
          }, ]
        },
    options: {
      events:['click'],
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 10,
            fontColor: "#FFFFFF",
            fontSize: 10
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: "#FFFFFF"
          },
          ticks: {
            fontColor: "#FFFFFF",
            fontSize: 10,
          }
        }]
      }
    }
  })
}
