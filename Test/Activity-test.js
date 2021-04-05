const chai = require('chai');
const expect = chai.expect;
const Activity = require('../src/Activity');
const User = require('../src/User');
const ActivityTestingData = require('../Test/Activity-TestingData');
const UserTestingData = require('../Test/User-TestingData');
const selectedDate = '2019/06/21'
const startDate = '2019/06/15'

describe('Activity', () => {
  let user1, activity1;

  beforeEach(() => {
    user1 = new User(UserTestingData[0]);
    activity1 = new Activity(ActivityTestingData, user1);

  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of activity', () => {
    expect(activity1).to.be.an.instanceof(Activity);
  });

  it('should get all activity data for a user by ID', () => {
    expect(activity1.buildUserActivityData()).to.deep.equal(activity1.userActivity);
  });

  it('should be able to tell the user how many steps they have taken', () => {
    expect(activity1.returnStepsTaken(selectedDate)).to.equal(6760);
  });

  it('should be able to tell the user how many stairs they have climbed', () => {
    expect(activity1.returnStairsClimbed(selectedDate)).to.equal(6);
  });

  it('should be able to tell the user how many miles they have walked', () => {
    expect(activity1.returnMilesWalked(selectedDate)).to.equal('5.51')
  });

  it('should able to tell a user how many minutes they were active on a given day', () => {
    expect(activity1.returnActiveMinutes(selectedDate)).to.equal(135)
  });

  it('should tell the user how many active minutes in a given week', () => {
    expect(activity1.returnWeeklyAverageMinutes(startDate)).to.equal(171)
  })

  it('should tell the user if they met their step goal on a given date', () => {
    expect(activity1.calculateStepGoalMet('2019/06/17')).to.equal('You Met Your Daily Step Goal')
    expect(activity1.calculateStepGoalMet('2019/06/18')).to.equal('You Did Not Meet Your Daily Step Goal')
  })

  it('should tell the user all days that they exceeded their step goal', () => {
    expect(activity1.findStepGoalExceeded()).to.deep.equal([ '2019/06/17', '2019/06/20' ])
  })

  it('should tell the user their all time stair climbing record', () => {
    expect(activity1.returnStairClimbingRecord()).to.equal(36)
  })

  it('should be able to calculate the average activity data for all users on a given date', () => {
    expect(activity1.returnAverageStairsClimbed(selectedDate)).to.equal(15);
    expect(activity1.returnAverageStepsTaken(selectedDate)).to.equal(8161);
    expect(activity1.returnAverageActiveMinutes(selectedDate)).to.equal(169);
  });
})
