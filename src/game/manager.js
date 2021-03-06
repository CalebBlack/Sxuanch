import React from 'react';
import Lobby from './lobby';
import Game from './game';

class Manager extends React.Component {
  constructor(props){
    super(props);
    this.state = {location:'lobby'};
    this.leftRoom = this.leftRoom.bind(this);
    this.toLobby = this.toLobby.bind(this);
  }
  componentDidMount(){
    let onJoin = room=>{
      this.setState(Object.assign({},this.state,{location:'inGame',room}));
    };
    this.props.socket.on('roomcreated',onJoin);
    this.props.socket.on('roomjoined',onJoin);
    this.props.socket.on('leftroom',this.leftRoom);
    this.props.socket.on('gamedestroyed',this.leftRoom.bind(this,false));
  }
  leftRoom(safe=true){
    this.toLobby();
  }
  toLobby(){
    this.setState(Object.assign({},this.state,{location:'lobby'}));
  }
  render(){
    if (this.state.location === 'lobby') {
      return(<Lobby manager={this} socket={this.props.socket}/>);
    } else if (this.state.location === 'inGame') {
      return(<Game toLobby={this.toLobby} manager={this} socket={this.props.socket} room={this.state.room}/>);
    } else {
      return null;
    }
  }
  // leaveGame(){
  //   this.setState(Object.assign({},this.state,{location:'lobby'}));
  // }
}
export default Manager;
