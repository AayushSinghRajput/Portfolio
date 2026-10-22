import React, { Component, ErrorInfo, ReactNode } from "react";
import Hero3DFallback from "./Hero3DFallback";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("CanvasErrorBoundary caught a WebGL/Canvas error:", error.message, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <Hero3DFallback />;
    }

    return this.props.children;
  }
}

export default CanvasErrorBoundary;
