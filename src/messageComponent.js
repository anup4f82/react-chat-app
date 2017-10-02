
import React from 'react';
import TextInput from './textInput'

class MessageComponent extends React.Component {
  render() {
    return <h1>{this.props.message}</h1>;
  }
}

export default MessageComponent;