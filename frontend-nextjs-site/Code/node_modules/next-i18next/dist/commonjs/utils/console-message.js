"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createConsoleLog;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.object.freeze");

/* eslint-disable no-console */

/**
  * @readonly
  * @enum {String} A console.log type
  */
var messageTypes = {
  error: 'error',
  info: 'info',
  warn: 'warn'
};
Object.freeze(messageTypes);
/**
 *  Logs a custom message to console
 * @param {messageTypes} messageType One of: error, warn or info
 * @param {String} message
 */

function logMessage(messageType, message) {
  if (Object.values(messageTypes).includes(messageType)) {
    console[messageType](message);
  } else {
    console.info(message);
  }
}
/**
 * Create a console log with specified log type, a message and options
 * @param {messageTypes} messageType One of: error, warn or info
 * @param {String} message
 * @param {Object} options
 */


function createConsoleLog(messageType, message) {
  var _this$config = this.config,
      errorStackTraceLimit = _this$config.errorStackTraceLimit,
      strictMode = _this$config.strictMode;
  var prevStackLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = errorStackTraceLimit;
  var util;

  if (!strictMode) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    util = require('util');
  } else {
    return;
  }
  /* Temporarily set the stacktrace to 0 or errorStackTraceLimit,
     in order to only display a message */


  Error.errorStackTraceLimit = errorStackTraceLimit; // Make room for new message

  console.log(); // Make sure the message is a string

  if (typeof message !== 'string') {
    var metaError = new Error();
    metaError.name = 'Meta';
    metaError.message = "Param message needs to be of type: string. Instead, '".concat((0, _typeof2["default"])(message), "' was provided.\n\n------------------------------------------------\n\n\u200B\n        The provided ").concat((0, _typeof2["default"])(message), ":\n\n\u200B\n          ").concat(util.inspect(message, true, 8, true), "\n\u200B\n------------------------------------------------\n\n    ");
    console.error(metaError);
    return;
  } // Log the message to console


  logMessage(messageType, message); // Reset stack limit

  Error.stackTraceLimit = prevStackLimit;
}