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
              if(payload.body === "") {
                if(!this.props.usersInAttendance.moderator.includes(this.props.username)) {
                  this.props.setAlertText("The moderator has ended the session. All session data has been deleted. Click OK to be redirected or close the window to exit")
                  this.props.setConfirmationCallback(() => () => {return window.location = process.env.REACT_APP_FRONTEND_BASEURL})
                  this.props.setCallbackWithoutConfirmation(true)
                  this.props.setIsAlertVisible(true)
                }
              }

              this.props.setTopics(JSON.parse(payload.body));

              if(JSON.parse(payload.body).currentDiscussionItem.text !== undefined) {
                if(this.props.sessionStatus !== "DISCUSSING") {
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
          this.props.setAlertText("An error occurred, please refresh the page and try again")
          this.props.setIsAlertVisible(true)
        }
      );
    }
  }

  render() {
    return <div/>
  }
}

export default WebSocketClient;

