import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
          rooms: [],
          newRoomName: '',
          name: ''
      };
    this.roomsRef = this.props.firebase.database().ref('rooms');
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
    
   render() {
    return (
       <section className="room-list">
       <h3>Chat Rooms</h3>
           {this.state.rooms.map( room => 
               <li key={room.key} >
                 {room.name}
               </li>
           )}
       </section>
    );
  }
}

export default RoomList;
