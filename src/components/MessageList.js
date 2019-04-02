import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
    this.roomsRef = this.props.firebase.database().ref('messages');
  }

    sendMessage(e) {
    e.preventDefault();
    if (!this.state.newMessage) { return }
    this.roomsRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({ newMessage: ''  });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value })
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render() {
      return (
        <div>
        <h2>Messages:</h2>
        <ul className='messages'>
          {this.state.messages
            .filter(message => message.roomId === this.props.activeRoom)
            .map((message, key) => (
            <li key={message.key}>
              {message.content}
            </li>
          ))}
        </ul>
        <form onSubmit={ (e) => this.sendMessage(e) }>
          <input type="text" value={ this.state.newMessage } onChange={ (e) => this.handleChange(e) } />
          <input type="submit" value="Send Message"/>
        </form>
        </div>
      );
    }

}

export default MessageList;