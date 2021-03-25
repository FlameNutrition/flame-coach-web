export {
  addDailyTask,
  addMultipleDailyTasks,
  getDailyTasksByClientAndDay,
  updateDailyTaskByUUID,
  deleteDailyTasksByUUID
} from './axios-dailyTask';

export {
  getClientsCoachPlusClientsAvailableForCoaching,
  getClientsCoach
} from './axios-coach';

export {
  getUserDetails,
  updateUserDetails
} from './axios-user';

export {
  enrollmentProcessInit,
  enrollmentProcessFinish,
  enrollmentProcessBreak
} from './axios-enrollment-process';
