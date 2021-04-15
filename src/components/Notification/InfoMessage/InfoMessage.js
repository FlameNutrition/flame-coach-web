/* eslint-disable lines-between-class-members */
import { INFO, SUCCESS } from '../notificationTypes';

class InfoMessage {
  // Customer
  static CODE_2001 = new InfoMessage('Contact information updated with success!', SUCCESS)
  static CODE_2002 = new InfoMessage('Personal information updated with success!', SUCCESS)

  // Daily Tasks
  static CODE_4001 = new InfoMessage('Task added with success!', SUCCESS)
  static CODE_4002 = new InfoMessage('Task updated with success!', SUCCESS)
  static CODE_4003 = new InfoMessage('Task deleted with success!', SUCCESS)

  // UI
  static CODE_0001 = new InfoMessage('If you want to leave please ask for us or your coach.', INFO)

  constructor(msg, level) {
    this.msg = msg;
    this.level = level;
    Object.freeze(this);
  }
}

const InfoMessageProxy = new Proxy(InfoMessage, {
  construct() {
    throw new TypeError(`${InfoMessage.name} is an enum; no instances of it can be constructed.`);
  },
  defineProperty() {
    throw new TypeError(`${InfoMessage.name} is an enum; no new properties can be appended to it.`);
  },
  deleteProperty() {
    throw new TypeError(`${InfoMessage.name} is an enum; no new properties can be appended to it.`);
  },
  set() {
    throw new TypeError(`${InfoMessage.name} is an enum; its instances cannot be modified.`);
  },
  setPrototypeOf() {
    throw new TypeError(`${InfoMessage.name} is an enum; its prototype cannot be changed.`);
  },
});

export default InfoMessageProxy;
