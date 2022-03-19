import React from 'react';
import WsocketComponent from '../components/WsocketComponent';
import { withRouter } from 'react-router-dom';

const WebSocket = () => {
  return (
    <React.Fragment>
      <WsocketComponent />
    </React.Fragment>
  );
};

export default WebSocket;
