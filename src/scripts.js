const userRepository = new UserRepository(userData);
const hydration = new Hydration(hydrationData, userRepository.currentUser.id);
const sleep = new Sleep(sleepData, userRepository.currentUser.id);
const activity = new Activity(activityData, userRepository.currentUser);
let selectedDate = '2019/09/22';
let startDate = '2019/09/16';
let endDate = '2019/09/22';
// let Chart = require('chart.js');

const userInfoButton = document.getElementById('userinfoButton');
const userInfoDropdown = document.getElementById('userInfoPage');
const userEmail = document.getElementById('userinfoEmail');
const userStepGoal = document.getElementById('userinfoGoal');
const averageStepGoal = document.getElementById('averageStepGoal');
const userNameDisplay = document.getElementById('userName');
const averageOunces = document.getElementById('averageOunces')
const selectedDateHydration = document.getElementById('selectedDateHydration');
const selectedWeekHydration = document.getElementById('selectedWeekHydration');
const hoursSleptLastNight = document.getElementById('hoursSleptLastNight');
const sleepQualityLastNight = document.getElementById('sleepQualityLastNight');
const averageHoursSlept = document.getElementById('averageHoursSlept');
const averageSleepQuality = document.getElementById('averageSleepQuality');
const hoursSleptForSelectedWeek = document.getElementById('hoursSleptForSelectedWeek');
const sleepQualityForSelectedWeek = document.getElementById('sleepQualityForSelectedWeek');
const dateRangePickerEnd = document.getElementById('dateRangePickerEnd');
const stepsByDay = document.getElementById('stepsByDay');
const activeMinutesByDay = document.getElementById('activeMinutesByDay');
const milesWalkedByDay = document.getElementById('milesWalkedByDay');
const compareSteps = document.getElementById('compareSteps');
const compareActiveMinutes = document.getElementById('compareActiveMinutes');
const compareStairsClimbed = document.getElementById('compareStairsClimbed');
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
});
const end = datepicker(document.getElementById('dateRangePickerEnd'), {
  id: 'dateRangePicker',
  startDate: new Date(2019, 8, 1),
  minDate: new Date(2019, 5, 15),
  maxDate: new Date(2019, 8, 22),
  onSelect: (instance, date) => {
    if (date) {
    let stringifiedRange = JSON.stringify(end.getRange());
    let splitRange = stringifiedRange.split("\"");
    let startRange = splitRange[3]
    let endRange = splitRange[7]
    startDate = startRange.substring(0, 10).replaceAll('-', '/');
    endDate = endRange.substring(0, 10).replaceAll('-', '/');
    showHydrationData();
    showSleepData();
    showActivityData();
   }
  }
});


window.addEventListener('load', displayUserInfo);
userInfoButton.addEventListener('click', showDropdown);
dateRangePickerEnd.addEventListener('click', showSleepAndHydrationForWeek)


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
    return `You took ${Math.abs(stepDifferece)} steps more than the average user on ${selectedDate}`
  } else if (stepDifferece > 0) {
    return `Your took ${stepDifferece} steps less than the average user on ${selectedDate}`
  } else {
    return `Your took the same amount of steps as the average user on ${selectedDate}`
  }
}

function calculateActiveMinuteDifference() {
  let averageMinutes = activity.returnAverageActiveMinutes(selectedDate);
  let userMinutes = activity.returnActiveMinutes(selectedDate);
  let minuteDifference = averageMinutes - userMinutes;
  if (minuteDifference < 0) {
    return `You were active for ${Math.abs(minuteDifference)} minutes more than the average user on ${selectedDate}`
  } else if (minuteDifference > 0) {
    return `Your were active for ${minuteDifference} minutes less than the average user on ${selectedDate}`
  } else {
    return `Your were active for the same amount of minutes as the average user on ${selectedDate}`
  }
}

function calculateStairsClimbedDifferece() {
  let averageStairsClimbed = activity.returnAverageStairsClimbed(selectedDate);
  let userStairsClimbed = activity.returnStairsClimbed(selectedDate);
  let stairDifference = averageStairsClimbed - userStairsClimbed;
  if (stairDifference < 0) {
    return `You climbed ${Math.abs(stairDifference)} more stairs than the average user on ${selectedDate}`
  } else if (stairDifference > 0) {
    return `You climbed ${stairDifference} less than the average user on ${selectedDate}`
  } else {
    return `You climbed the same amount of stairs as the average user on ${selectedDate}`
  }
}



function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showSleepAndHydrationForWeek() {
  console.log('hello')
  selectedWeekHydration.classList.toggle('hide');
  hoursSleptForSelectedWeek.toggle('hide');
  sleepQualityForSelectedWeek.toggle('hide');
}

function showHydrationData() {
  averageOunces.innerText = `Average Daily water intake: ${hydration.calculateAverageOunces()}`
  selectedDateHydration.innerText = `Intake for ${selectedDate}: ${hydration.calculateDailyOunces(selectedDate)} fl oz`
  selectedWeekHydration.innerText = `Intake for the week of ${startDate}: ${hydration.calculateWeeklyOz(startDate)}`
}

function showSleepData() {
  averageHoursSlept.innerText = `Average Hours Slept: ${sleep.calculateAverageHoursSleptPerDay()}`
  averageSleepQuality.innerText = `Average Sleep Quality: ${sleep.calculateAverageSleepQualityPerDay()}`
  hoursSleptLastNight.innerText = `Hours slept on ${selectedDate}: ${sleep.calculateHoursSleptByDate(selectedDate)}`
  sleepQualityLastNight.innerText = `Sleep Quality on ${selectedDate}: ${sleep.calculateSleepQualityByDate(selectedDate)}`
  hoursSleptForSelectedWeek.innerText = `Hours Slept For The Week Of ${startDate}: ${sleep.generateHoursSleptByWeek(startDate)}`
  sleepQualityForSelectedWeek.innerText = `Sleep Quality For The Week Of ${startDate}: ${sleep.generateSleepQualityByWeek(startDate)}`
  createSleepChart(selectedDate)
}

function createSleepChart(selectedDate) {
  const sleepChart = document.getElementById('sleepChart').getContext('2d');
  let weeklyHoursSlept = sleep.generateHoursSleptByWeek(selectedDate);

  let sleepDataChart = new Chart(sleepChart, {
    type: 'bar',
    data: {
      label: 'Hours Slept',
      datasets: [{
        data: `${weeklyHoursSlept}`,
        backgroundColor: [
          'rgba(255, 99, 132, .5)',
          'rgba(54, 162, 235, .5)',
          'rgba(255, 206, 86, .5)',
          'rgba(75, 192, 192, .5)',
          'rgba(153, 102, 255, .5)',
          'rgba(255, 159, 64, .5)',
          'rgb(48, 142, 161, .5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgb(48, 142, 161, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function showActivityData() {
  stepsByDay.innerText = `Steps Taken On ${selectedDate}: ${activity.returnStepsTaken(selectedDate)}`
  activeMinutesByDay.innerText = `Minutes Active On ${selectedDate}: ${activity.returnActiveMinutes(selectedDate)}`
  milesWalkedByDay.innerText = `Miles Walked On ${selectedDate}: ${activity.returnMilesWalked(selectedDate)}`
  compareSteps.innerText = calculateStepDifference();
  compareActiveMinutes.innerText = calculateActiveMinuteDifference();
  compareStairsClimbed.innerText = calculateStairsClimbedDifferece();
}

