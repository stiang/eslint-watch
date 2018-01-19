'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logger2.default)('arg-parser');
logger.debug('Loaded');

var simpleDetail = 'simple-detail';
var formatterPath = 'formatters';

var defaultPath = './';
var formatKey = '-f';
var keys = {
  '-w': true,
  '--watch': true,
  '--changed': true,
  '--clear': true,
  '--esw-version': true
};
var formats = {
  'simple': true,
  'simple-success': true,
  'simple-detail': true
};

function getPath(options) {
  logger.debug('GetPath: %s', options.format);
  var formatPath = _path2.default.join(__dirname, formatterPath, options.format);
  logger.debug(formatPath);
  return formatPath;
};

exports.default = {
  parse(cliArgs, options) {
    var dirs = options._;
    var formatSpecified = false;
    var args = _lodash2.default.slice(cliArgs, 2, cliArgs.length);
    logger.debug('Directories to check: %o', dirs);
    logger.debug('Args %o', args);
    var arr = _lodash2.default.without(_lodash2.default.map(args, function (item) {
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcmctcGFyc2VyLmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsImRlYnVnIiwic2ltcGxlRGV0YWlsIiwiZm9ybWF0dGVyUGF0aCIsImRlZmF1bHRQYXRoIiwiZm9ybWF0S2V5Iiwia2V5cyIsImZvcm1hdHMiLCJnZXRQYXRoIiwib3B0aW9ucyIsImZvcm1hdCIsImZvcm1hdFBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwicGFyc2UiLCJjbGlBcmdzIiwiZGlycyIsIl8iLCJmb3JtYXRTcGVjaWZpZWQiLCJhcmdzIiwic2xpY2UiLCJsZW5ndGgiLCJhcnIiLCJ3aXRob3V0IiwibWFwIiwiaXRlbSIsInVuZGVmaW5lZCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxzQkFBTyxZQUFQLENBQWY7QUFDQUEsT0FBT0MsS0FBUCxDQUFhLFFBQWI7O0FBRUEsSUFBTUMsZUFBZSxlQUFyQjtBQUNBLElBQU1DLGdCQUFnQixZQUF0Qjs7QUFFQSxJQUFNQyxjQUFjLElBQXBCO0FBQ0EsSUFBTUMsWUFBWSxJQUFsQjtBQUNBLElBQU1DLE9BQU87QUFDWCxRQUFNLElBREs7QUFFWCxhQUFXLElBRkE7QUFHWCxlQUFhLElBSEY7QUFJWCxhQUFXLElBSkE7QUFLWCxtQkFBaUI7QUFMTixDQUFiO0FBT0EsSUFBTUMsVUFBVTtBQUNkLFlBQVUsSUFESTtBQUVkLG9CQUFrQixJQUZKO0FBR2QsbUJBQWlCO0FBSEgsQ0FBaEI7O0FBTUEsU0FBU0MsT0FBVCxDQUFpQkMsT0FBakIsRUFBMEI7QUFDeEJULFNBQU9DLEtBQVAsQ0FBYSxhQUFiLEVBQTRCUSxRQUFRQyxNQUFwQztBQUNBLE1BQU1DLGFBQWEsZUFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCVixhQUFyQixFQUFvQ00sUUFBUUMsTUFBNUMsQ0FBbkI7QUFDQVYsU0FBT0MsS0FBUCxDQUFhVSxVQUFiO0FBQ0EsU0FBT0EsVUFBUDtBQUNEOztrQkFFYztBQUNiRyxRQUFNQyxPQUFOLEVBQWVOLE9BQWYsRUFBd0I7QUFDdEIsUUFBTU8sT0FBT1AsUUFBUVEsQ0FBckI7QUFDQSxRQUFJQyxrQkFBa0IsS0FBdEI7QUFDQSxRQUFNQyxPQUFPLGlCQUFFQyxLQUFGLENBQVFMLE9BQVIsRUFBaUIsQ0FBakIsRUFBb0JBLFFBQVFNLE1BQTVCLENBQWI7QUFDQXJCLFdBQU9DLEtBQVAsQ0FBYSwwQkFBYixFQUF5Q2UsSUFBekM7QUFDQWhCLFdBQU9DLEtBQVAsQ0FBYSxTQUFiLEVBQXdCa0IsSUFBeEI7QUFDQSxRQUFNRyxNQUFNLGlCQUFFQyxPQUFGLENBQVUsaUJBQUVDLEdBQUYsQ0FBTUwsSUFBTixFQUFZLFVBQUNNLElBQUQsRUFBVTtBQUMxQyxVQUFJLENBQUNuQixLQUFLbUIsSUFBTCxDQUFELElBQWUsQ0FBQ2xCLFFBQVFrQixJQUFSLENBQXBCLEVBQW1DO0FBQ2pDekIsZUFBT0MsS0FBUCxDQUFhLGtCQUFiLEVBQWlDd0IsSUFBakM7QUFDQSxlQUFPQSxJQUFQO0FBQ0Q7QUFDRCxVQUFJbEIsUUFBUWtCLElBQVIsQ0FBSixFQUFtQjtBQUNqQlAsMEJBQWtCLElBQWxCO0FBQ0FsQixlQUFPQyxLQUFQLENBQWEsa0JBQWI7QUFDQSxlQUFPTyxRQUFRQyxPQUFSLENBQVA7QUFDRDtBQUNGLEtBVnFCLENBQVYsRUFVUmlCLFNBVlEsQ0FBWjs7QUFZQSxRQUFJakIsUUFBUUMsTUFBUixLQUFtQlIsWUFBbkIsSUFBbUMsQ0FBQ2dCLGVBQXhDLEVBQXlEO0FBQ3ZEbEIsYUFBT0MsS0FBUCxDQUFhLDBCQUFiO0FBQ0FxQixVQUFJSyxJQUFKLENBQVN0QixTQUFUO0FBQ0FpQixVQUFJSyxJQUFKLENBQVNuQixRQUFRQyxPQUFSLENBQVQ7QUFDRDtBQUNELFFBQUksQ0FBQ08sS0FBS0ssTUFBVixFQUFrQjtBQUNoQkMsVUFBSUssSUFBSixDQUFTdkIsV0FBVDtBQUNBSixhQUFPQyxLQUFQLENBQWEsMEJBQWIsRUFBeUNHLFdBQXpDO0FBQ0Q7QUFDRCxXQUFPa0IsR0FBUDtBQUNEO0FBN0JZLEMiLCJmaWxlIjoiYXJnLXBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IExvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlcignYXJnLXBhcnNlcicpO1xubG9nZ2VyLmRlYnVnKCdMb2FkZWQnKTtcblxuY29uc3Qgc2ltcGxlRGV0YWlsID0gJ3NpbXBsZS1kZXRhaWwnO1xuY29uc3QgZm9ybWF0dGVyUGF0aCA9ICdmb3JtYXR0ZXJzJztcblxuY29uc3QgZGVmYXVsdFBhdGggPSAnLi8nO1xuY29uc3QgZm9ybWF0S2V5ID0gJy1mJztcbmNvbnN0IGtleXMgPSB7XG4gICctdyc6IHRydWUsXG4gICctLXdhdGNoJzogdHJ1ZSxcbiAgJy0tY2hhbmdlZCc6IHRydWUsXG4gICctLWNsZWFyJzogdHJ1ZSxcbiAgJy0tZXN3LXZlcnNpb24nOiB0cnVlXG59O1xuY29uc3QgZm9ybWF0cyA9IHtcbiAgJ3NpbXBsZSc6IHRydWUsXG4gICdzaW1wbGUtc3VjY2Vzcyc6IHRydWUsXG4gICdzaW1wbGUtZGV0YWlsJzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZ2V0UGF0aChvcHRpb25zKSB7XG4gIGxvZ2dlci5kZWJ1ZygnR2V0UGF0aDogJXMnLCBvcHRpb25zLmZvcm1hdCk7XG4gIGNvbnN0IGZvcm1hdFBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBmb3JtYXR0ZXJQYXRoLCBvcHRpb25zLmZvcm1hdCk7XG4gIGxvZ2dlci5kZWJ1Zyhmb3JtYXRQYXRoKTtcbiAgcmV0dXJuIGZvcm1hdFBhdGg7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBhcnNlKGNsaUFyZ3MsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBkaXJzID0gb3B0aW9ucy5fO1xuICAgIGxldCBmb3JtYXRTcGVjaWZpZWQgPSBmYWxzZTtcbiAgICBjb25zdCBhcmdzID0gXy5zbGljZShjbGlBcmdzLCAyLCBjbGlBcmdzLmxlbmd0aCk7XG4gICAgbG9nZ2VyLmRlYnVnKCdEaXJlY3RvcmllcyB0byBjaGVjazogJW8nLCBkaXJzKTtcbiAgICBsb2dnZXIuZGVidWcoJ0FyZ3MgJW8nLCBhcmdzKTtcbiAgICBjb25zdCBhcnIgPSBfLndpdGhvdXQoXy5tYXAoYXJncywgKGl0ZW0pID0+IHtcbiAgICAgIGlmICgha2V5c1tpdGVtXSAmJiAhZm9ybWF0c1tpdGVtXSkge1xuICAgICAgICBsb2dnZXIuZGVidWcoJ1B1c2hpbmcgaXRlbTogJXMnLCBpdGVtKTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICBpZiAoZm9ybWF0c1tpdGVtXSkge1xuICAgICAgICBmb3JtYXRTcGVjaWZpZWQgPSB0cnVlO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0Zvcm1hdCBzcGVjaWZpZWQnKTtcbiAgICAgICAgcmV0dXJuIGdldFBhdGgob3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSksIHVuZGVmaW5lZCk7XG5cbiAgICBpZiAob3B0aW9ucy5mb3JtYXQgPT09IHNpbXBsZURldGFpbCAmJiAhZm9ybWF0U3BlY2lmaWVkKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgY3VzdG9tIGZvcm1hdHRlcicpO1xuICAgICAgYXJyLnB1c2goZm9ybWF0S2V5KTtcbiAgICAgIGFyci5wdXNoKGdldFBhdGgob3B0aW9ucykpO1xuICAgIH1cbiAgICBpZiAoIWRpcnMubGVuZ3RoKSB7XG4gICAgICBhcnIucHVzaChkZWZhdWx0UGF0aCk7XG4gICAgICBsb2dnZXIuZGVidWcoJ1NldHRpbmcgZGVmYXVsdCBwYXRoOiAlcycsIGRlZmF1bHRQYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxufTtcbiJdfQ==