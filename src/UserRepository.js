class UserRepository {
  constructor(userData, User) {
    this.userData = userData;
    this.users = this.createUsers(User);
    this.currentUser = this.selectCurrentUser();
  }

  selectCurrentUser() {
    const randomIndex = Math.floor(Math.random() * this.users.length);
    return this.users[randomIndex];
  }

  createUsers(User) {
    const createdUsers = [];
    this.userData.forEach((userDataObject, i) => {
      var user = new User(userDataObject);
      createdUsers.push(user);
    });
    return createdUsers;
  }

  returnUserData(id) {
    let currentUserData;
    this.userData.forEach((userDataObject, i) => {
      if (userDataObject.id === id) {
        currentUserData = userDataObject;
      }
    });
    return currentUserData;
  }

  returnAverageStepGoal() {
    let totalUserStepGoal = 0;
    this.users.forEach((user, i) => {
      totalUserStepGoal = totalUserStepGoal + user.dailyStepGoal;
    });
    let averageStepGoal = totalUserStepGoal / this.users.length;
    return Math.round(averageStepGoal);
  }

}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
