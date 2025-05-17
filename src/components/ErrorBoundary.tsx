
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
          <p className="mb-4 text-gray-700">We've encountered an error and our team has been notified.</p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-w-full text-left text-sm my-4">
            {this.state.error?.message || "Unknown error occurred"}
          </pre>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-shesoul-bubblegum text-white rounded-md hover:bg-opacity-90"
          >
            Go back to home page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
