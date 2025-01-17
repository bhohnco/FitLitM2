const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const UserRepository = require('../src/UserRepository');
const userTestingData = require('../Test/User-TestingData.js');

describe('User Repo', () => {
  let user, userRepository;
  beforeEach(() => {
    userRepository = new UserRepository(userTestingData, User);
  });

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of user repository', () => {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should be able to take in and store userData', () => {
    expect(userRepository.userData).to.deep.equal(userTestingData);
  });

  it('should be able to create and store multiple users', () => {
    userRepository.createUsers(User);
    expect(userRepository.users).to.be.an('array').with.a.lengthOf(3);
  });

  it('should be able to return user data if given an id', () => {
    userRepository.createUsers(User);
    expect(userRepository.returnUserData(1)).to.deep.equal(userRepository.userData[0]);
  });

  it('should be able to return the average step goal for all users', () => {
    userRepository.createUsers(User);
    expect(userRepository.returnAverageStepGoal()).to.equal(7000);
  });

});
