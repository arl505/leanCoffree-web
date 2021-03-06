import React from 'react'
import Axios from 'axios'
import WebSocketClient from '../WebSocketClient'

export default function Session() {

  const [sessionId, setSessionId] = React.useState("");
  const [sessionStatus, setSessionStatus] = React.useState("");
  const [topics, setTopics] = React.useState([]);
  const [currentTopicEndTime, setCurrentTopicEndTime] = React.useState("");
  const [usersInAttendance, setUsersInAttendance] = React.useState([]);
  const [websocketUserId, setWebsocketUserId] = React.useState("");
  const [connectToWebSocketServer, setConnectToWebSocketServer] = React.useState(false);
  
  React.useEffect(() => {
    if (sessionStatus === "" && sessionId === "") {
      let windowHref = window.location.href;
      let url = windowHref.match(process.env.REACT_APP_SESSION_REGEX);
      if(url === null) {
        return window.location = process.env.REACT_APP_FRONTEND_BASEURL;
      }

      let sessionIdFromAddress = url[0].match("[0-9, a-f]{8}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{12}");
      if(sessionIdFromAddress === null) {
        return window.location = process.env.REACT_APP_FRONTEND_BASEURL;
      }

      Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/verify-session/' + sessionIdFromAddress, null)
        .then((response) => {
          if(isVerificationResponseValid(response, sessionIdFromAddress[0])) {
            let status = response.data.sessionDetails.sessionStatus === "STARTED"
              ? "ASK_FOR_USERNAME_STARTED"
              : "ASK_FOR_USERNAME_DISCUSSING";
            setConnectToWebSocketServer(true);
            setSessionId(response.data.sessionDetails.sessionId);
            setSessionStatus(status);
          } else {
            return window.location = process.env.REACT_APP_FRONTEND_BASEURL;
          }
        })
        .catch((error) => {
          console.log("Received an error while verifying session: " + error);
          return window.location = process.env.REACT_APP_FRONTEND_BASEURL;
        });
    }
  });

  let isVerificationResponseValid = (response, sessionIdFromAddress) => {
    return response.data.verificationStatus === "VERIFICATION_SUCCESS" && response.data.sessionDetails.sessionId === sessionIdFromAddress 
      && (response.data.sessionDetails.sessionStatus === "STARTED" || response.data.sessionDetails.sessionStatus === "DISCUSSING");
  }

  return (
    <div>
      {
        connectToWebSocketServer 
          ? <WebSocketClient sessionId={sessionId} setTopics={setTopics} setCurrentTopicEndTime={setCurrentTopicEndTime} setWebsocketUserId={setWebsocketUserId}
              sessionStatus={sessionStatus} setSessionStatus={setSessionStatus} setUsersInAttendance={setUsersInAttendance}/>
          : null
      }

      Session Page!
      <br/>
      Session ID: {sessionId}
      <br/>
      Session Status: {sessionStatus}
    </div>
  )
}