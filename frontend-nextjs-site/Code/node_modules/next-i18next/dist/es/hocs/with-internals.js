function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
export default ((WrappedComponent, config) => {
  class WithInternals extends React.Component {
    static displayName = `withnextI18NextInternals(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    render() {
      return React.createElement(WrappedComponent, _extends({}, this.props, {
        nextI18NextInternals: config
      }));
    }

  }

  return WithInternals;
});