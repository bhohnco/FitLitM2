class Activity {
  constructor(activityData, id) {
    this.userActivityData = activityData;
    this.id = id;
    this.userActivity = this.buildUserActivityData();
  }

  buildUserActivityData() {
    return this.userActivityData.filter(user => user.userID === this.id);
  }

  calculateMilesWalked() {
    return Math.round(this.userActivity.numSteps * this.userData.strideLength / 5280).toFixed(1);
  }

}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}