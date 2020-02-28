'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'path',

  lookup: function lookup(req, res, options) {
    var found = void 0;

    if (req === undefined) {
      return found;
    }

    if (options.lookupPath !== undefined && req.params) {
      found = req.params[options.lookupPath];
    }

    if (!found && typeof options.lookupFromPathIndex === 'number' && req.originalUrl) {
      var path = req.originalUrl.split('?')[0];
      var parts = path.split('/');
      if (parts[0] === '') {
        // Handle paths that start with a slash, i.e., '/foo' -> ['', 'foo']
        parts.shift();
      }

      if (parts.length > options.lookupFromPathIndex) {
        found = parts[options.lookupFromPathIndex];
      }
    }

    return found;
  }
};