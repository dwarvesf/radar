"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("core-js/modules/es6.array.find");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.array.is-array");

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _pathMatch = _interopRequireDefault(require("path-match"));

var _utils = require("../utils");

var route = (0, _pathMatch["default"])();

function _default(nexti18next) {
  var config = nexti18next.config,
      i18n = nexti18next.i18n;
  var allLanguages = config.allLanguages,
      ignoreRoutes = config.ignoreRoutes,
      localeSubpaths = config.localeSubpaths;

  var isI18nRoute = function isI18nRoute(req) {
    return ignoreRoutes.every(function (x) {
      return !req.url.startsWith(x);
    });
  };

  var localeSubpathRoute = route("/:subpath(".concat(Object.values(localeSubpaths).join('|'), ")(.*)"));
  var middleware = [];
  /*
    If not using server side language detection,
    we need to manually set the language for
    each request
  */

  if (!config.serverLanguageDetection) {
    middleware.push(function (req, _res, next) {
      if (isI18nRoute(req)) {
        req.lng = config.defaultLanguage;
      }

      next();
    });
  }
  /*
    This does the bulk of the i18next work
  */


  middleware.push(_i18nextExpressMiddleware["default"].handle(i18n, {
    ignoreRoutes: ignoreRoutes
  }));
  /*
    This does the locale subpath work
  */

  middleware.push(function (req, res, next) {
    if (isI18nRoute(req) && req.i18n) {
      var currentLng = (0, _utils.lngFromReq)(req);
      var currentLngSubpath = (0, _utils.subpathFromLng)(config, currentLng);
      var currentLngRequiresSubpath = (0, _utils.subpathIsRequired)(config, currentLng);
      var currentLngSubpathIsPresent = (0, _utils.subpathIsPresent)(req.url, currentLngSubpath);
      var lngFromCurrentSubpath = allLanguages.find(function (l) {
        return (0, _utils.subpathIsPresent)(req.url, (0, _utils.subpathFromLng)(config, l));
      });

      if (lngFromCurrentSubpath !== undefined && lngFromCurrentSubpath !== currentLng) {
        /*
          If a user has hit a subpath which does not
          match their language, give preference to
          the path, and change user language.
        */
        req.i18n.changeLanguage(lngFromCurrentSubpath);
        currentLng = lngFromCurrentSubpath;
      } else if (currentLngRequiresSubpath && !currentLngSubpathIsPresent) {
        /*
          If a language subpath is required and
          not present, prepend correct subpath
        */
        return (0, _utils.redirectWithoutCache)(res, (0, _utils.addSubpath)(req.url, currentLngSubpath));
      }
      /*
        If a locale subpath is present in the URL,
        modify req.url in place so that NextJs will
        render the correct route
      */


      if (typeof lngFromCurrentSubpath === 'string') {
        var params = localeSubpathRoute(req.url);

        if (params !== false) {
          var subpath = params.subpath;
          req.query = (0, _objectSpread2["default"])({}, req.query, {
            subpath: subpath,
            lng: currentLng
          });
          req.url = (0, _utils.removeSubpath)(req.url, subpath);
        }
      }
    }

    next();
  });
  return middleware;
}