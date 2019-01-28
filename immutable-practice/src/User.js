import React, { Component } from 'react';

class User extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.user !== nextProps.user;
  }

  render () {
    const { username} = this.props.user;
    console.log('%s가 렌더링 되고 있어요!', username);
    
    return (
      <div>
        {username}
      </div>
    );
  }
}

export default User;