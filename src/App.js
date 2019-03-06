import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from "./components/RoomList.js";

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
  render() {
    return (
      <div className='App'>
        <header>
          <h1>Let's Chat!</h1>
          <nav>{/* NAV BAR WILL GO HERE */} </nav>
        </header>

        <main>
          <RoomList firebase = {firebase} />
        </main>

      </div>
    );
  }
}

export default App;
      

