import React from 'react';

export default class Unread extends React.Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    this.increment();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  increment() {
    this.setState(({ count }) => ({ count: count + 1 }));
    this.timeout = setTimeout(() => {
      this.increment();
    }, 1000);
  }

  render() {
    const { count } = this.state;
    return <span>{count}</span>;
  }
}
