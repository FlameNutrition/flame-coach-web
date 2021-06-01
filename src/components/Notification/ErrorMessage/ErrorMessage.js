import { ERROR, WARNING } from '../notificationTypes';

/* eslint-disable lines-between-class-members */
import { logWarn } from '../../../logging';

class ErrorMessage {
  // Request
  static CODE_1001 = new ErrorMessage('CODE_1001', 'Missing a mandatory field.', WARNING)

  // Customer
  static CODE_2001 = new ErrorMessage('CODE_2001', 'Customer not found! Please ask help for the admin system.', ERROR)
  static CODE_2002 = new ErrorMessage('CODE_2002', 'Email already registed, please use another email.', WARNING)
  static CODE_2003 = new ErrorMessage('CODE_2003', 'Email or password invalid, please try again.', WARNING)

  // Enrollment Process
  static CODE_3001 = new ErrorMessage('CODE_3001', "Client already has a coach assigned, you can't apply the enrollment process.", WARNING)
  static CODE_3002 = new ErrorMessage('CODE_3002', 'Please check if the client already has a coach or if you start the enrollment process.', WARNING)

  // Daily Tasks
  static CODE_4001 = new ErrorMessage('CODE_4001', 'Daily task not found! Please ask help for the admin system.', ERROR)
  static CODE_4002 = new ErrorMessage('CODE_4002', 'You can not delete this task.', ERROR)

  // Configs
  static CODE_5001 = new ErrorMessage('CODE_5001', 'Config is not present in the system. Please report this problem', ERROR)

  // Generic
  static CODE_9999 = new ErrorMessage('CODE_9999', 'Oops! Something went wrong! Help us improve your experience by reporting the problem.', ERROR)

  // UI
  static CODE_0001 = new ErrorMessage('CODE_0001', 'End date is the same or after the start date.', WARNING)
  static CODE_0002 = new ErrorMessage('CODE_0002', 'Ops! You need select a client first. Please choose a client in the top of the application', WARNING)
  static CODE_0003 = new ErrorMessage('CODE_0003', 'Ops! You need select a task first. Please choose the task you want to update', WARNING)
  static CODE_0004 = new ErrorMessage('CODE_0004', 'After confirmation you will need to ask us or your coach to leave this experience.', WARNING)
  static CODE_0005 = new ErrorMessage('CODE_0005', '\'Password\' and \'Confirm password\' fields don\'t have the same value.', WARNING)
  static CODE_0006 = new ErrorMessage('CODE_0006', 'Please insert a valid weight', WARNING)
  static CODE_0007 = new ErrorMessage('CODE_0007', 'Please insert a valid date', WARNING)

  static fromCode(code) {
    const value = this[`CODE_${code}`];

    if (value) {
      return value;
    }

    logWarn('ErrorMessage', 'fromCode', 'Not found any error message for mappping');
    return this.CODE_9999;
  }

  constructor(code, msg, level) {
    this.code = code;
    this.msg = msg;
    this.level = level;
    Object.freeze(this);
  }
}

const ErrorMessageProxy = new Proxy(ErrorMessage, {
  construct() {
    throw new TypeError(`${ErrorMessage.name} is an enum; no instances of it can be constructed.`);
  },
  defineProperty() {
    throw new TypeError(`${ErrorMessage.name} is an enum; no new properties can be appended to it.`);
  },
  deleteProperty() {
    throw new TypeError(`${ErrorMessage.name} is an enum; no new properties can be appended to it.`);
  },
  set() {
    throw new TypeError(`${ErrorMessage.name} is an enum; its instances cannot be modified.`);
  },
  setPrototypeOf() {
    throw new TypeError(`${ErrorMessage.name} is an enum; its prototype cannot be changed.`);
  },
});

export default ErrorMessageProxy;
