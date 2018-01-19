'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorWarning;

var _chalk = require('chalk');

function errorWarning(result) {
  return result.errorCount || result.warningCount ? `${(0, _chalk.red)(result.errorCount)}/${(0, _chalk.yellow)(result.warningCount)} ${(0, _chalk.white)(result.filePath)}` : `${(0, _chalk.red)(result.messages.length)} ${(0, _chalk.white)(result.filePath)}`;
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mb3JtYXR0ZXJzL2hlbHBlcnMvZXJyb3Itd2FybmluZy5qcyJdLCJuYW1lcyI6WyJlcnJvcldhcm5pbmciLCJyZXN1bHQiLCJlcnJvckNvdW50Iiwid2FybmluZ0NvdW50IiwiZmlsZVBhdGgiLCJtZXNzYWdlcyIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBRXdCQSxZOztBQUZ4Qjs7QUFFZSxTQUFTQSxZQUFULENBQXNCQyxNQUF0QixFQUE4QjtBQUMzQyxTQUFPQSxPQUFPQyxVQUFQLElBQXFCRCxPQUFPRSxZQUE1QixHQUNKLEdBQUUsZ0JBQUlGLE9BQU9DLFVBQVgsQ0FBdUIsSUFBRyxtQkFBT0QsT0FBT0UsWUFBZCxDQUE0QixJQUFHLGtCQUFNRixPQUFPRyxRQUFiLENBQXVCLEVBRDlFLEdBRUosR0FBRSxnQkFBSUgsT0FBT0ksUUFBUCxDQUFnQkMsTUFBcEIsQ0FBNEIsSUFBRyxrQkFBTUwsT0FBT0csUUFBYixDQUF1QixFQUYzRDtBQUdEIiwiZmlsZSI6ImVycm9yLXdhcm5pbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWQsIHllbGxvdywgd2hpdGUgfSBmcm9tICdjaGFsayc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVycm9yV2FybmluZyhyZXN1bHQpIHtcbiAgcmV0dXJuIHJlc3VsdC5lcnJvckNvdW50IHx8IHJlc3VsdC53YXJuaW5nQ291bnQgP1xuICAgIGAke3JlZChyZXN1bHQuZXJyb3JDb3VudCl9LyR7eWVsbG93KHJlc3VsdC53YXJuaW5nQ291bnQpfSAke3doaXRlKHJlc3VsdC5maWxlUGF0aCl9YCA6XG4gICAgYCR7cmVkKHJlc3VsdC5tZXNzYWdlcy5sZW5ndGgpfSAke3doaXRlKHJlc3VsdC5maWxlUGF0aCl9YDtcbn07XG4iXX0=