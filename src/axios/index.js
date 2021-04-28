export {
  addDailyTask,
  addMultipleDailyTasks,
  getDailyTasksByClientAndDay,
  updateDailyTaskByUUID,
  deleteDailyTasksByUUID
} from './axios-dailyTask';

export {
  getClientsCoachPlusClientsAvailableForCoaching,
  getClientsCoach,
  getCoachContactInformation,
  updateCoachContactInformation
} from './axios-coach';

export {
  getClientContactInformation,
  getClientPersonalData,
  updateClientContactInformation,
  updateClientPersonalData
} from './axios-client';

export {
  enrollmentProcessInit,
  enrollmentProcessFinish,
  enrollmentProcessBreak,
  enrollmentProcessStatus
} from './axios-enrollment-process';

export {
  updatePassword
} from './axios-auth';
