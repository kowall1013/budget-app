import React from "react";
import { LoadingIndicator } from "components";
import Button from "components/Button";
import { refetchAllQueries } from "react-query";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  tryAgain = async () => {
    await refetchAllQueries({ includeInactive: true });
    this.setState({ hasError: false });
  };

  render() {
    return (
      <React.Suspense fallback={<LoadingIndicator />}>
        {this.state.hasError ? (
          <div>
            Something went wrong! <Button onClick={this.tryAgain}>Try again</Button>
          </div>
        ) : (
          <>{this.props.children}</>
        )}
      </React.Suspense>
    );
  }
}

export default ErrorBoundary;
