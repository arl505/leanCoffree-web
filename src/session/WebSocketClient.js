import React from 'react'
import Axios from 'axios'

let stompClient = null;
class WebSocketClient extends React.Component {

  componentDidMount() {
    if (stompClient === null || (stompClient !== null && stompClient.connected === false)) {
      const Stomp = require('stompjs')
      var SockJS = require('sockjs-client')
      SockJS = new SockJS(process.env.REACT_APP_BACKEND_BASEURL + '/lean-coffree')
      stompClient = (Stomp.over(SockJS))
      
      if(process.env.REACT_APP_STOMP_CLIENT_DEBUG === 'false') {
        stompClient.debug = null;
      }
      
      stompClient.connect({}, 
        (frame) => {
          stompClient.subscribe('/topic/discussion-topics/session/' + this.props.sessionId, 
            (payload) => {
              if(JSON.parse(payload.body).currentDiscussionItem.text === undefined) {
                this.props.setTopics(JSON.parse(payload.body));
              } else {
                this.props.setTopics(JSON.parse(payload.body));
                this.props.setCurrentTopicEndTime(JSON.parse(payload.body).currentDiscussionItem.endTime);
                if(this.props.sessionStatus !== "" && !this.props.sessionStatus.includes("ASK_FOR_USERNAME") && this.props.sessionStatus !== "DISCUSSING") {
                  this.props.setSessionStatus("DISCUSSING");
                }
              }
            }
          );
          stompClient.subscribe('/topic/users/session/' + this.props.sessionId, 
            (payload) => {
              this.props.setUsersInAttendance(JSON.parse(payload.body));
            }
          );

          Axios.get(process.env.REACT_APP_BACKEND_BASEURL + "/refresh-users/" + this.props.sessionId);
          this.props.setWebsocketUserId(frame.headers['user-name']);
        }, 
        (error) => {
          alert('Could not connect you: ' + error);
        }
      );
    }
  }

  render() {
    return <div/>
  }
}

export default WebSocketClient;

