import React from 'react';
import BuggyCounter from "../BuggyCounter.tsx";
import ErrorBoundary from "../ErrorBoundary.tsx";

export default class Root extends React.Component {
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div style={{marginTop: '100px'}}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return (
      <div style={{marginTop: '100px'}}>
        This was rendered by app 1, which is written in React.
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
      </div>
    );
  }
}
