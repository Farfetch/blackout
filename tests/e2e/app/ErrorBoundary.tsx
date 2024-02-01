import React, { type PropsWithChildren } from 'react';

export default class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallback?: React.ReactNode }>,
  { error?: Error }
> {
  constructor(props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1 className="text-red-600 p-2 font-bold text-xl">
            <span className="mr-1" role="img" aria-label="surprise for you">
              💥
            </span>
            Test crashed!
          </h1>
          <pre className="p-2">
            <code>{this.state.error.stack}</code>
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
