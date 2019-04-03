import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from "./components/RoomList.js";
import MessageList from "./components/MessageList";

import User from './components/User';


var config = {
  apiKey: "AIzaSyA1hDR20FmXD9HdEPz25XTNB8sqAVJ3JRk",
  authDomain: "bloc-chat-dc195.firebaseapp.com",
  databaseURL: "https://bloc-chat-dc195.firebaseio.com",
  projectId: "bloc-chat-dc195",
  storageBucket: "bloc-chat-dc195.appspot.com",
  messagingSenderId: "104364572138"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: 'No Room Selected Yet',
      activeUser: 'Guest'
    };
  }

  setActiveRoom(e) {
    this.setState({ activeRoom: e.target.value })
  }

  setUser(user) {
    this.setState( {activeUser: user.displayName} )
  }

  render() {
    return (
      <div>
      <User
        firebase={firebase}
        setUser={(user) => this.setUser(user)}
        activeUser={this.state.activeUser}
      />
      <RoomList
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        setActiveRoom={(e) => this.setActiveRoom(e)}
      />
      <h1>Active Room: {this.state.activeRoom} </h1>
      <MessageList
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        activeUser={this.state.activeUser}
      />
      </div>
    );
  }
}

export default App;
