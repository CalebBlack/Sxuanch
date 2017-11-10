import React from 'react';
import io from 'socket.io-client';
import Background from '../components/background';
import Loading from '../components/loading';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as loginStatuses from '../redux/loginstatuses';

var socket = null;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.initializeSocket = this.initializeSocket.bind(this);
  }
  render(){
    if (this.props.loginStatus === null || [loginStatuses.loggingIn,loginStatuses.initializing].includes(this.props.loginStatus)) return (<Loading/>);
    if (this.props.loginStatus !== loginStatuses.loggedIn) return (<Redirect to='/login'/>);
    if (!socket) {
      this.initializeSocket();
    }
    console.log('s',socket);

    return (
    <div id='game'>
    </div>
  );
  }
  initializeSocket(){
    socket = io();
    socket.on('connect', function () {
      console.log('connected');
      socket.emit('authenticate', {token: localStorage.sessionID});
    }).on('disconnect', function () {
      console.log('disconnected');
    });
  }
}
export default connect(state=>{
  return {loginStatus:state.loginStatus}
})(Game);
