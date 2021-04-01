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
  enrollmentProcessBreak
} from './axios-enrollment-process';
