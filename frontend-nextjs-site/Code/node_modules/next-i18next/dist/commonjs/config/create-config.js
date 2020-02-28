"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.map");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defaultConfig = _interopRequireDefault(require("./default-config"));

var _utils = require("../utils");

var deepMergeObjects = ['backend', 'detection'];

var _default = function _default(userConfig) {
  if (typeof userConfig.localeSubpaths === 'string') {
    throw new Error('The localeSubpaths option has been changed to an object. Please refer to documentation.');
  } // Initial merge of default and user-provided config


  var combinedConfig = (0, _objectSpread2["default"])({}, _defaultConfig["default"], userConfig); // Sensible defaults to prevent user duplication

  combinedConfig.allLanguages = combinedConfig.otherLanguages.concat([combinedConfig.defaultLanguage]);
  combinedConfig.whitelist = combinedConfig.allLanguages;
  var allLanguages = combinedConfig.allLanguages,
      defaultLanguage = combinedConfig.defaultLanguage,
      localeExtension = combinedConfig.localeExtension,
      localePath = combinedConfig.localePath,
      localeStructure = combinedConfig.localeStructure;

  if ((0, _utils.isServer)()) {
    var fs = eval("require('fs')");

    var path = require('path'); // Validate defaultNS
    // https://github.com/isaachinman/next-i18next/issues/358


    if (process.env.NODE_ENV !== 'production' && typeof combinedConfig.defaultNS === 'string') {
      var defaultNSPath = path.join(process.cwd(), "".concat(localePath, "/").concat(defaultLanguage, "/").concat(combinedConfig.defaultNS, ".").concat(localeExtension));
      var defaultNSExists = fs.existsSync(defaultNSPath);

      if (!defaultNSExists) {
        throw new Error("Default namespace not found at ".concat(defaultNSPath));
      }
    } // Set server side backend


    combinedConfig.backend = {
      loadPath: path.join(process.cwd(), "".concat(localePath, "/").concat(localeStructure, ".").concat(localeExtension)),
      addPath: path.join(process.cwd(), "".concat(localePath, "/").concat(localeStructure, ".missing.").concat(localeExtension)) // Set server side preload (languages and namespaces)

    };
    combinedConfig.preload = allLanguages;

    if (!combinedConfig.ns) {
      var getAllNamespaces = function getAllNamespaces(p) {
        return fs.readdirSync(p).map(function (file) {
          return file.replace(".".concat(localeExtension), '');
        });
      };

      combinedConfig.ns = getAllNamespaces(path.join(process.cwd(), "".concat(localePath, "/").concat(defaultLanguage)));
    }
  } else {
    // Set client side backend
    combinedConfig.backend = {
      loadPath: "/".concat(localePath, "/").concat(localeStructure, ".").concat(localeExtension),
      addPath: "/".concat(localePath, "/").concat(localeStructure, ".missing.").concat(localeExtension)
    };
    combinedConfig.ns = [combinedConfig.defaultNS];
  } // Set fallback language to defaultLanguage in production


  if (!userConfig.fallbackLng) {
    combinedConfig.fallbackLng = process.env.NODE_ENV === 'production' ? combinedConfig.defaultLanguage : false;
  } // Deep merge with overwrite - goes last


  deepMergeObjects.forEach(function (obj) {
    if (userConfig[obj]) {
      combinedConfig[obj] = (0, _objectSpread2["default"])({}, _defaultConfig["default"][obj], userConfig[obj]);
    }
  });
  return combinedConfig;
};

exports["default"] = _default;