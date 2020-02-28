'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
  name: 'session',

  lookup: function lookup(req, res, options) {
    var found = void 0;

    if (options.lookupSession !== undefined && (typeof req === 'undefined' ? 'undefined' : _typeof(req)) && req.session) {
      found = req.session[options.lookupSession];
    }

    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(req, res, lng) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (options.lookupSession && req && req.session) {
      req.session[options.lookupSession] = lng;
    }
  }
};