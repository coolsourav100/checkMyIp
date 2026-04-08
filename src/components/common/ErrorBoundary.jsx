import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught runtime error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-surface-container flex flex-col justify-center items-center p-6 text-center">
          <span className="material-symbols-outlined text-[80px] text-error mb-6">warning</span>
          <h1 className="font-headline text-4xl font-bold text-on-surface mb-4">Something went wrong.</h1>
          <p className="text-on-surface-variant max-w-md mb-8 text-lg">
            We encountered an unexpected error while trying to render this section of the application.
          </p>
          <button 
            onClick={() => window.location.assign('/')}
            className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:bg-primary/90 transition-all active:scale-95"
          >
            Return to Homepage
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
