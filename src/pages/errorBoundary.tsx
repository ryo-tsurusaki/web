import { Component, ErrorInfo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false 
    }
  }

  public static getDerivedStateFromError(error: Error) {
    console.log('getDerivedStateFromError', error)
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('componentDidCatch', error, errorInfo)
    return { hasError: true }
  }

  public render() {
    const { hasError } = this.state
    const { children } = this.props
    return hasError ? <h1>エラーが発生しました</h1> : children
  }
}
