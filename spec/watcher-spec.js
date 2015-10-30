'use strict';
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

var expect = chai.expect;
var proxy = require('proxyquire');

describe('Watcher', function () {
  var watcher;
  var onSpy;
  var errorSpy;
  var watcherOptions;
  var on;
  var path;
  var isIgnored;

  before(function(){
    var cliEngine = function(){};
    cliEngine.prototype.isPathIgnored = function() {
      return isIgnored;
    };
    cliEngine.prototype.getConfigForFile = function() {};
    cliEngine.prototype.executeOnFiles = function() {
      return {
        results: [{ errorCount: 0, warningCount: 0 }]
      };
    };
    watcher = proxy('../src/watcher',{
      './log': function(){
        return {
          log: function(){},
          debug: function(){}
        };
      },
      'chokidar': {
        watch: function(options){
          watcherOptions = options;
          return {
            on: on
          };
        },
      },
      'eslint': {
        CLIEngine: cliEngine
      },
      './formatters/simple-detail': function(){},
      './formatters/helpers/success': function(){}
    });
  });

  beforeEach(function(){
    onSpy = sinon.spy();
    errorSpy = sinon.spy();
    path = '';
    isIgnored = false;
    on = function(event, cllbk){
      onSpy(event);
      cllbk(path);
      return {
        on: errorSpy
      };
    };
  });

  it('calls the on event', function(){
    watcher({ _: [] });
    expect(onSpy.called).to.be.true;
  });

  it('watches the directories under _ attribute', function() {
    var arr = ['hello'];
    watcher({ _: arr });
    expect(watcherOptions).to.equal(arr);
  });

  it('it calls the on changed event', function() {
    watcher({ _: [] });
    expect(onSpy).to.have.been.calledWith('change');
  });

});
