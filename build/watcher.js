'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = watcher;

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _eslint = require('eslint');

var _eslint2 = _interopRequireDefault(_eslint);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _clearTerminal = require('./formatters/helpers/clear-terminal.js');

var _clearTerminal2 = _interopRequireDefault(_clearTerminal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _logger2.default)('watcher');

logger.debug('Loaded');

var events = { change: 'change' };
var chokidarOptions = {
  ignored: /\.git|node_modules|bower_components/
};
var cliOptionProperties = ['config', 'eslintrc', 'ext', 'parser', 'cache', 'cacheLocation', 'ignore', 'ignorePath', 'ignorePattern', 'fix', 'parserOptions', 'global'];
var cliOptionMap = {
  config: 'configFile',
  eslintrc: 'useEslintrc',
  ext: 'extensions',
  cacheFile: 'cacheLocation'
};

function filterWarnings(results) {
  return _lodash2.default.reduce(results, function (curr, result) {
    if (result.warningCount) {
      var newResult = _lodash2.default.omit(result, 'messages');
      newResult.messages = _lodash2.default.filter(result.messages, function (m) {
        return m.severity > 1;
      });
      curr.push(newResult);
      return curr;
    }
    curr.push(result);
    return curr;
  }, []);
}

function requireFormatter(formatterPath) {
  try {
    return require(formatterPath);
  } catch (ex) {
    ex.message = `There was a problem loading formatter: ${formatterPath}\nError: ${ex.message}`;
    throw ex;
  }
}

function getFormatter(cli, formatter) {
  formatter = formatter || '';
  var pathToFormatterSpecified = formatter.includes('\\');
  var isSimpleFormatter = formatter.includes('simple');
  var formatterPath = formatter.replace(/\\/g, '/');

  if (isSimpleFormatter) {
    logger.debug(`Formatter local: ${formatter}`);

    return requireFormatter(`./formatters/${formatterPath}`);
  } else if (pathToFormatterSpecified) {
    var cwd = process.cwd();

    logger.debug('Formatter user:', formatterPath);
    var location = _path2.default.resolve(cwd, formatterPath);

    return requireFormatter(location);
  }

  logger.debug(`Formatter eslint: ${formatter}`);

  return cli.getFormatter(formatter);
}

///https://github.com/eslint/eslint/blob/233440e524aa41545b66b2c3c7ca26fe790e32e0/tests/lib/cli-engine.js#L105-L107

function watcher(options) {
  var cliOptions = (0, _lodash2.default)(options).pick(cliOptionProperties).reduce(function (result, value, key) {
    key = cliOptionMap[key] || key;
    result[key] = value;
    return result;
  }, {});
  logger.debug('cli', cliOptions);
  logger.debug('options', options);
  var cli = new _eslint2.default.CLIEngine(cliOptions);
  var watchDir = options._.length ? options._ : [_path2.default.resolve('./')];

  var formatter = getFormatter(cli, options.format);

  function lintFile(path) {
    logger.debug('lintFile: %s', path);
    if (options.clear) {
      (0, _clearTerminal2.default)();
    }
    var report = cli.executeOnFiles(path);
    if (options.fix) {
      _eslint2.default.CLIEngine.outputFixes(report);
    }
    var results = _settings2.default.cliOptions.quiet ? filterWarnings(report.results) : report.results;

    logger.log(formatter(results));
  }

  function isWatchableExtension(filePath, extensions) {
    logger.debug(filePath, extensions);
    if (extensions) {
      return _lodash2.default.includes(extensions, _path2.default.extname(filePath));
    }

    // Use the ESLint default extension, if none is provided
    return _lodash2.default.includes(cli.options.extensions, _path2.default.extname(filePath));
  }

  _chokidar2.default.watch(watchDir, chokidarOptions).on(events.change, function changeEvent(path) {
    logger.debug('Changed:', path);
    if (!cli.isPathIgnored(path) && isWatchableExtension(path, options.ext)) {
      var watchPath = options.changed ? [path] : watchDir;

      lintFile(watchPath);
    }
  }).on('error', logger.error);

  logger.debug('Watching: %o', watchDir);
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93YXRjaGVyLmpzIl0sIm5hbWVzIjpbIndhdGNoZXIiLCJsb2dnZXIiLCJkZWJ1ZyIsImV2ZW50cyIsImNoYW5nZSIsImNob2tpZGFyT3B0aW9ucyIsImlnbm9yZWQiLCJjbGlPcHRpb25Qcm9wZXJ0aWVzIiwiY2xpT3B0aW9uTWFwIiwiY29uZmlnIiwiZXNsaW50cmMiLCJleHQiLCJjYWNoZUZpbGUiLCJmaWx0ZXJXYXJuaW5ncyIsInJlc3VsdHMiLCJyZWR1Y2UiLCJjdXJyIiwicmVzdWx0Iiwid2FybmluZ0NvdW50IiwibmV3UmVzdWx0Iiwib21pdCIsIm1lc3NhZ2VzIiwiZmlsdGVyIiwibSIsInNldmVyaXR5IiwicHVzaCIsInJlcXVpcmVGb3JtYXR0ZXIiLCJmb3JtYXR0ZXJQYXRoIiwicmVxdWlyZSIsImV4IiwibWVzc2FnZSIsImdldEZvcm1hdHRlciIsImNsaSIsImZvcm1hdHRlciIsInBhdGhUb0Zvcm1hdHRlclNwZWNpZmllZCIsImluY2x1ZGVzIiwiaXNTaW1wbGVGb3JtYXR0ZXIiLCJyZXBsYWNlIiwiY3dkIiwicHJvY2VzcyIsImxvY2F0aW9uIiwicmVzb2x2ZSIsIm9wdGlvbnMiLCJjbGlPcHRpb25zIiwicGljayIsInZhbHVlIiwia2V5IiwiQ0xJRW5naW5lIiwid2F0Y2hEaXIiLCJfIiwibGVuZ3RoIiwiZm9ybWF0IiwibGludEZpbGUiLCJwYXRoIiwiY2xlYXIiLCJyZXBvcnQiLCJleGVjdXRlT25GaWxlcyIsImZpeCIsIm91dHB1dEZpeGVzIiwicXVpZXQiLCJsb2ciLCJpc1dhdGNoYWJsZUV4dGVuc2lvbiIsImZpbGVQYXRoIiwiZXh0ZW5zaW9ucyIsImV4dG5hbWUiLCJ3YXRjaCIsIm9uIiwiY2hhbmdlRXZlbnQiLCJpc1BhdGhJZ25vcmVkIiwid2F0Y2hQYXRoIiwiY2hhbmdlZCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7OztrQkErRXdCQSxPOztBQS9FeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFF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QkMsVUFBdkI7QUFDQSxRQUFJQSxVQUFKLEVBQWdCO0FBQ2QsYUFBTyxpQkFBRTVCLFFBQUYsQ0FBVzRCLFVBQVgsRUFBdUIsZUFBS0MsT0FBTCxDQUFhRixRQUFiLENBQXZCLENBQVA7QUFDRDs7QUFFRDtBQUNBLFdBQU8saUJBQUUzQixRQUFGLENBQVdILElBQUlVLE9BQUosQ0FBWXFCLFVBQXZCLEVBQW1DLGVBQUtDLE9BQUwsQ0FBYUYsUUFBYixDQUFuQyxDQUFQO0FBQ0Q7O0FBRUQscUJBQVNHLEtBQVQsQ0FBZWpCLFFBQWYsRUFBeUIzQyxlQUF6QixFQUNHNkQsRUFESCxDQUNNL0QsT0FBT0MsTUFEYixFQUNxQixTQUFTK0QsV0FBVCxDQUFxQmQsSUFBckIsRUFBMkI7QUFDNUNwRCxXQUFPQyxLQUFQLENBQWEsVUFBYixFQUF5Qm1ELElBQXpCO0FBQ0EsUUFBSSxDQUFDckIsSUFBSW9DLGFBQUosQ0FBa0JmLElBQWxCLENBQUQsSUFBNEJRLHFCQUFxQlIsSUFBckIsRUFBMkJYLFFBQVEvQixHQUFuQyxDQUFoQyxFQUF5RTtBQUN2RSxVQUFNMEQsWUFBWTNCLFFBQVE0QixPQUFSLEdBQ2QsQ0FBQ2pCLElBQUQsQ0FEYyxHQUVkTCxRQUZKOztBQUlBSSxlQUFTaUIsU0FBVDtBQUNEO0FBQ0YsR0FWSCxFQVVLSCxFQVZMLENBVVEsT0FWUixFQVVpQmpFLE9BQU9zRSxLQVZ4Qjs7QUFZQXRFLFNBQU9DLEtBQVAsQ0FBYSxjQUFiLEVBQTZCOEMsUUFBN0I7QUFDRCIsImZpbGUiOiJ3YXRjaGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNob2tpZGFyIGZyb20gJ2Nob2tpZGFyJztcbmltcG9ydCBlc2xpbnQgZnJvbSAnZXNsaW50JztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgY2xlYXJUZXJtaW5hbCBmcm9tICcuL2Zvcm1hdHRlcnMvaGVscGVycy9jbGVhci10ZXJtaW5hbC5qcyc7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlcignd2F0Y2hlcicpO1xuXG5sb2dnZXIuZGVidWcoJ0xvYWRlZCcpO1xuXG5jb25zdCBldmVudHMgPSB7IGNoYW5nZTogJ2NoYW5nZScgfTtcbmNvbnN0IGNob2tpZGFyT3B0aW9ucyA9IHtcbiAgaWdub3JlZDogL1xcLmdpdHxub2RlX21vZHVsZXN8Ym93ZXJfY29tcG9uZW50cy9cbn07XG5jb25zdCBjbGlPcHRpb25Qcm9wZXJ0aWVzID0gW1xuICAnY29uZmlnJywgJ2VzbGludHJjJywgJ2V4dCcsXG4gICdwYXJzZXInLCAnY2FjaGUnLCAnY2FjaGVMb2NhdGlvbicsXG4gICdpZ25vcmUnLCAnaWdub3JlUGF0aCcsICdpZ25vcmVQYXR0ZXJuJyxcbiAgJ2ZpeCcsICdwYXJzZXJPcHRpb25zJywgJ2dsb2JhbCdcbl07XG5jb25zdCBjbGlPcHRpb25NYXAgPSB7XG4gIGNvbmZpZzogJ2NvbmZpZ0ZpbGUnLFxuICBlc2xpbnRyYzogJ3VzZUVzbGludHJjJyxcbiAgZXh0OiAnZXh0ZW5zaW9ucycsXG4gIGNhY2hlRmlsZTogJ2NhY2hlTG9jYXRpb24nXG59O1xuXG5mdW5jdGlvbiBmaWx0ZXJXYXJuaW5ncyhyZXN1bHRzKSB7XG4gIHJldHVybiBfLnJlZHVjZShyZXN1bHRzLCAoY3VyciwgcmVzdWx0KSA9PntcbiAgICBpZiAocmVzdWx0Lndhcm5pbmdDb3VudCkge1xuICAgICAgbGV0IG5ld1Jlc3VsdCA9IF8ub21pdChyZXN1bHQsICdtZXNzYWdlcycpO1xuICAgICAgbmV3UmVzdWx0Lm1lc3NhZ2VzID0gXy5maWx0ZXIocmVzdWx0Lm1lc3NhZ2VzLCAobSkgPT4gbS5zZXZlcml0eSA+IDEpO1xuICAgICAgY3Vyci5wdXNoKG5ld1Jlc3VsdCk7XG4gICAgICByZXR1cm4gY3VycjtcbiAgICB9XG4gICAgY3Vyci5wdXNoKHJlc3VsdCk7XG4gICAgcmV0dXJuIGN1cnI7XG4gIH0sIFtdKTtcbn1cblxuZnVuY3Rpb24gcmVxdWlyZUZvcm1hdHRlcihmb3JtYXR0ZXJQYXRoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoZm9ybWF0dGVyUGF0aCk7XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgZXgubWVzc2FnZSA9IGBUaGVyZSB3YXMgYSBwcm9ibGVtIGxvYWRpbmcgZm9ybWF0dGVyOiAke2Zvcm1hdHRlclBhdGh9XFxuRXJyb3I6ICR7ZXgubWVzc2FnZX1gO1xuICAgIHRocm93IGV4O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZvcm1hdHRlcihjbGksIGZvcm1hdHRlcikge1xuICBmb3JtYXR0ZXIgPSBmb3JtYXR0ZXIgfHwgJyc7XG4gIGNvbnN0IHBhdGhUb0Zvcm1hdHRlclNwZWNpZmllZCA9IGZvcm1hdHRlci5pbmNsdWRlcygnXFxcXCcpO1xuICBjb25zdCBpc1NpbXBsZUZvcm1hdHRlciA9IGZvcm1hdHRlci5pbmNsdWRlcygnc2ltcGxlJyk7XG4gIGNvbnN0IGZvcm1hdHRlclBhdGggPSBmb3JtYXR0ZXIucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuXG4gIGlmIChpc1NpbXBsZUZvcm1hdHRlcikge1xuICAgIGxvZ2dlci5kZWJ1ZyhgRm9ybWF0dGVyIGxvY2FsOiAkeyBmb3JtYXR0ZXIgfWApO1xuXG4gICAgcmV0dXJuIHJlcXVpcmVGb3JtYXR0ZXIoYC4vZm9ybWF0dGVycy8keyBmb3JtYXR0ZXJQYXRoIH1gKTtcbiAgfSBlbHNlIGlmIChwYXRoVG9Gb3JtYXR0ZXJTcGVjaWZpZWQpIHtcbiAgICBjb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgbG9nZ2VyLmRlYnVnKCdGb3JtYXR0ZXIgdXNlcjonLCBmb3JtYXR0ZXJQYXRoKTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHBhdGgucmVzb2x2ZShjd2QsIGZvcm1hdHRlclBhdGgpO1xuXG4gICAgcmV0dXJuIHJlcXVpcmVGb3JtYXR0ZXIobG9jYXRpb24pO1xuICB9XG5cbiAgbG9nZ2VyLmRlYnVnKGBGb3JtYXR0ZXIgZXNsaW50OiAkeyBmb3JtYXR0ZXIgfWApO1xuXG4gIHJldHVybiBjbGkuZ2V0Rm9ybWF0dGVyKGZvcm1hdHRlcik7XG5cbn1cblxuLy8vaHR0cHM6Ly9naXRodWIuY29tL2VzbGludC9lc2xpbnQvYmxvYi8yMzM0NDBlNTI0YWE0MTU0NWI2NmIyYzNjN2NhMjZmZTc5MGUzMmUwL3Rlc3RzL2xpYi9jbGktZW5naW5lLmpzI0wxMDUtTDEwN1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3YXRjaGVyKG9wdGlvbnMpIHtcbiAgY29uc3QgY2xpT3B0aW9ucyA9IF8ob3B0aW9ucylcbiAgICAucGljayhjbGlPcHRpb25Qcm9wZXJ0aWVzKVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgICAga2V5ID0gY2xpT3B0aW9uTWFwW2tleV0gfHwga2V5O1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pO1xuICBsb2dnZXIuZGVidWcoJ2NsaScsIGNsaU9wdGlvbnMpO1xuICBsb2dnZXIuZGVidWcoJ29wdGlvbnMnLCBvcHRpb25zKTtcbiAgY29uc3QgY2xpID0gbmV3IGVzbGludC5DTElFbmdpbmUoY2xpT3B0aW9ucyk7XG4gIGNvbnN0IHdhdGNoRGlyID0gb3B0aW9ucy5fLmxlbmd0aFxuICAgID8gb3B0aW9ucy5fXG4gICAgOiBbcGF0aC5yZXNvbHZlKCcuLycpXTtcblxuICBjb25zdCBmb3JtYXR0ZXIgPSBnZXRGb3JtYXR0ZXIoY2xpLCBvcHRpb25zLmZvcm1hdCk7XG5cbiAgZnVuY3Rpb24gbGludEZpbGUocGF0aCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnbGludEZpbGU6ICVzJywgcGF0aCk7XG4gICAgaWYgKG9wdGlvbnMuY2xlYXIpIHtcbiAgICAgIGNsZWFyVGVybWluYWwoKTtcbiAgICB9XG4gICAgY29uc3QgcmVwb3J0ID0gY2xpLmV4ZWN1dGVPbkZpbGVzKHBhdGgpO1xuICAgIGlmIChvcHRpb25zLmZpeCkge1xuICAgICAgZXNsaW50LkNMSUVuZ2luZS5vdXRwdXRGaXhlcyhyZXBvcnQpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHRzID0gc2V0dGluZ3MuY2xpT3B0aW9ucy5xdWlldFxuICAgICAgPyBmaWx0ZXJXYXJuaW5ncyhyZXBvcnQucmVzdWx0cylcbiAgICAgIDogcmVwb3J0LnJlc3VsdHM7XG5cbiAgICBsb2dnZXIubG9nKGZvcm1hdHRlcihyZXN1bHRzKSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1dhdGNoYWJsZUV4dGVuc2lvbihmaWxlUGF0aCwgZXh0ZW5zaW9ucykge1xuICAgIGxvZ2dlci5kZWJ1ZyhmaWxlUGF0aCwgZXh0ZW5zaW9ucyk7XG4gICAgaWYgKGV4dGVuc2lvbnMpIHtcbiAgICAgIHJldHVybiBfLmluY2x1ZGVzKGV4dGVuc2lvbnMsIHBhdGguZXh0bmFtZShmaWxlUGF0aCkpO1xuICAgIH1cblxuICAgIC8vIFVzZSB0aGUgRVNMaW50IGRlZmF1bHQgZXh0ZW5zaW9uLCBpZiBub25lIGlzIHByb3ZpZGVkXG4gICAgcmV0dXJuIF8uaW5jbHVkZXMoY2xpLm9wdGlvbnMuZXh0ZW5zaW9ucywgcGF0aC5leHRuYW1lKGZpbGVQYXRoKSk7XG4gIH1cblxuICBjaG9raWRhci53YXRjaCh3YXRjaERpciwgY2hva2lkYXJPcHRpb25zKVxuICAgIC5vbihldmVudHMuY2hhbmdlLCBmdW5jdGlvbiBjaGFuZ2VFdmVudChwYXRoKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0NoYW5nZWQ6JywgcGF0aCk7XG4gICAgICBpZiAoIWNsaS5pc1BhdGhJZ25vcmVkKHBhdGgpICYmIGlzV2F0Y2hhYmxlRXh0ZW5zaW9uKHBhdGgsIG9wdGlvbnMuZXh0KSkge1xuICAgICAgICBjb25zdCB3YXRjaFBhdGggPSBvcHRpb25zLmNoYW5nZWRcbiAgICAgICAgICA/IFtwYXRoXVxuICAgICAgICAgIDogd2F0Y2hEaXI7XG5cbiAgICAgICAgbGludEZpbGUod2F0Y2hQYXRoKTtcbiAgICAgIH1cbiAgICB9KS5vbignZXJyb3InLCBsb2dnZXIuZXJyb3IpO1xuXG4gIGxvZ2dlci5kZWJ1ZygnV2F0Y2hpbmc6ICVvJywgd2F0Y2hEaXIpO1xufTtcbiJdfQ==