const chai = require('chai');
const expect = chai.expect;
const Activity = require('../src/Activity');
const ActivityTestingData = require('../Test/Activity-TestingData');

describe('Activity', () => {
  let activity1, activity2, activity3, allActivity;

  beforeEach(() => {
    activity1 = new Activity(ActivityTestingData, 1);
    activity2 = new Activity(ActivityTestingData, 2);
    activity3 = new Activity(ActivityTestingData, 3);
    allActivity = new Activity(ActivityTestingData);
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

  it.skip('should be able to tell the user how many miles they have walked', () => {
    expect(activity.returnMilesWalked().to.equal())
  });

  it.skip('should able to tell a user how many minutes they were active on a given day', () => {
    expect(activity.returnActiveMinutes(selectedDate).to.equal())
  });

  it.skip('should tell the user how many active minutes in a given week', () => {
    expect(activity.returnWeeklyAverageMinutes(startDate).to.equal())
  })

  it.skip('should tell the user if they met their step goal on a given date', () => {
    expect(activity.calculateStepGoalMet(selectedDate).to.equal())
  })

  it.skip('should tell the user all days that they exceeded their step goal', () => {
    expect(activity.findStepGoalExceeded().to.deep.equal())
  })

  it.skip('should tell the user their all time stair climbing record', () => {
    expect(activity.returnStairClimbingRecord().to.equal())
  })

  it.skip('should be able to calculate the average activity data for all users on a given date', () => {
    expect(activity.returnAverageStairsClimbed(selectedDate).to.equal())
    expect(activity.returnAverageStepsTaken(selectedDate).to.equal())
    expect(activity.returnAverageActiveMinutes(selectedDate).to.equal())
  });
})
