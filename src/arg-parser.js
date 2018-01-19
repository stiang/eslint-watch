import path from 'path';
import _ from 'lodash';

import Logger from './logger';

const logger = Logger('arg-parser');
logger.debug('Loaded');

const simpleDetail = 'simple-detail';
const formatterPath = 'formatters';

const defaultPath = './';
const formatKey = '-f';
const keys = {
  '-w': true,
  '--watch': true,
  '--changed': true,
  '--clear': true,
  '--esw-version': true
};
const formats = {
  'simple': true,
  'simple-success': true,
  'simple-detail': true
};

function getPath(options) {
  logger.debug('GetPath: %s', options.format);
  const formatPath = path.join(__dirname, formatterPath, options.format);
  logger.debug(formatPath);
  return formatPath;
};

export default {
  parse(cliArgs, options) {
    const dirs = options._;
    let formatSpecified = false;
    const args = _.slice(cliArgs, 2, cliArgs.length);
    logger.debug('Directories to check: %o', dirs);
    logger.debug('Args %o', args);
    const arr = _.without(_.map(args, (item) => {
      if (!keys[item] && !formats[item]) {
        logger.debug('Pushing item: %s', item);
        return item;
      }
      if (formats[item]) {
        formatSpecified = true;
        logger.debug('Format specified');
        return getPath(options);
      }
    }), undefined);

    if (options.format === simpleDetail && !formatSpecified) {
      logger.debug('setting custom formatter');
      arr.push(formatKey);
      arr.push(getPath(options));
    }
    if (!dirs.length) {
      arr.push(defaultPath);
      logger.debug('Setting default path: %s', defaultPath);
    }
    return arr;
  }
};
