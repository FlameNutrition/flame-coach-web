export {
  addDailyTask,
  getDailyTasksByClientAndDay,
  deleteDailyTasksByUUID
} from './axios-dailyTask';

export {
  getClientsCoachPlusClientsAvailableForCoaching
} from './axios-coach';

export {
  getClients
} from './axios-clients';

export {
  getUserDetails,
  updateUserDetails
} from './axios-user';

export {
  enrollmentProcessInit,
  enrollmentProcessFinish,
  enrollmentProcessBreak
} from './axios-enrollment-process';
