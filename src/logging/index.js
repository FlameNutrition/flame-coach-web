import logger from 'loglevel';

export const logInfo = (view, method, msg, ...others) => {
  logger.info(`view: '${view}', method: '${method}', msg: '${msg}'`, others);
};

export const logWarn = (view, method, msg, ...others) => {
  logger.warn(`view: '${view}', method: '${method}', msg: '${msg}'`, others);
};

export const logError = (view, method, msg, ...others) => {
  logger.error(`view: '${view}', method: '${method}', msg: '${msg}'`, others);
};

export const logDebug = (view, method, msg, ...others) => {
  logger.debug(`view: '${view}', method: '${method}', msg: '${msg}'`, others);
};
