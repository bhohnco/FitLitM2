const chai = require('chai');
const expect = chai.expect;
const Activity = require('../src/Activity');
const User = require('../src/User');
const ActivityTestingData = require('../Test/Activity-TestingData');
const UserTestingData = require('../Test/User-TestingData');
const selectedDate = '2019/06/21'
const startDate = '2019/06/15'

describe('Activity', () => {
  let user1, user2, user3, activity1, activity2, activity3, allActivity;

  beforeEach(() => {
    user1 = new User(UserTestingData[0]);
    user2 = new User(UserTestingData[1]);
    user3 = new User(UserTestingData[2]);
    activity1 = new Activity(ActivityTestingData, user1);
    activity2 = new Activity(ActivityTestingData, user2);
    activity3 = new Activity(ActivityTestingData, user3);
    // allActivity = new Activity(ActivityTestingData);
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

  it('should be able to tell the user how many miles they have walked', () => {
    expect(activity1.returnMilesWalked()).to.equal('47.75')
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

  it.skip('should tell the user their all time stair climbing record', () => {
    expect(activity.returnStairClimbingRecord()).to.equal()
  })

  it.skip('should be able to calculate the average activity data for all users on a given date', () => {
    expect(activity.returnAverageStairsClimbed(selectedDate)).to.equal()
    expect(activity.returnAverageStepsTaken(selectedDate)).to.equal()
    expect(activity.returnAverageActiveMinutes(selectedDate)).to.equal()
  });
})
