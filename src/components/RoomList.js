import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
          rooms: [],
          newRoomName: "",
      };
    this.roomsRef = this.props.firebase.database().ref('rooms');

    }
   createNewRoom(e) {
        e.preventDefault();
        if (this.handleSubmit(this.state.newRoomName)) {
          this.roomsRef.push({ name: this.state.newRoomName });
          this.setState({ newRoomName: "" });
        }
    }
componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
        console.log(snapshot);
        const room = snapshot.val();
        console.log(room);
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
    });
}
  
handleChange(e) {
    e.preventDefault();
    this.setState({ newRoomName: e.target.value });
}
    handleSubmit(newRoomName) {
        const newRoomLength = newRoomName.trim().length;
        if (newRoomLength > 0) {
          return true;
        } else {
          return false;
}
    } 
   render() {
    return (
       <section className="room-list">
       <h3>Chat Rooms</h3>
       <ul className='chat'>
       {this.state.rooms.map((room) => (
            <li key={room} className="roomname">
              {room.name}
              </li>
       ))}
           </ul>
           <form id="addRoomForm" onSubmit={e => this.createNewRoom(e)}>
          <fieldset>
            <legend>Create New Chat Room</legend>
            <input type="text" name="newRoomName" placeholder="New Room Name" onChange={e => this.handleChange(e)} />
            <input type="submit" value="Create" />
          </fieldset>
        </form>
        </section>
    );
  }
}
export default RoomList;
