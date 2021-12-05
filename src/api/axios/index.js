export {
  getCoachAppointments,
  getClientNextAppointment,
  getCoachNextAppointment,
  addAppointment,
  editAppointment,
  deleteAppointment
} from './axios-appointments';

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
  updateClientPersonalData,
  inviteClient
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

export {
  getWeightClient,
  addWeightClient,
  updateWeightClient,
  deleteWeightClient
} from './axios-measures-weight';

export {
  getCoachClientsMetrics
} from './axios-metrics';

export {
  getIncomes
} from './axios-incomes';

export {
  getHarrisBenedictCalculator
} from './axios-calories-calculator';


