import React, { Component } from 'react';

class ErrorBoundary extends Component {

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  render() {
    const { hasError } = this.state

    if(!hasError) return this.props.children
    
    return (
      <div className='container mt-5'>
        <p className='error'>Something went wrong...</p>
      </div>
    );
  }
}

export default ErrorBoundary;