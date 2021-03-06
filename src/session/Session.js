import React from 'react'
import Axios from 'axios'
import WebSocketClient from './WebSocketClient'
import Modal from '../Modal'

export default function Session() {

  const [sessionId, setSessionId] = React.useState("");
  const [sessionStatus, setSessionStatus] = React.useState("");
  const [topics, setTopics] = React.useState([]);
  const [currentTopicEndTime, setCurrentTopicEndTime] = React.useState("");
  const [usersInAttendance, setUsersInAttendance] = React.useState([]);
  const [websocketUserId, setWebsocketUserId] = React.useState("");
  const [connectToWebSocketServer, setConnectToWebSocketServer] = React.useState(false);
  const [isUsernamePromptOpen, setIsUsernamePromptOpen] = React.useState("opacity-0 fadeOut")
  const [usernameInput, setUsernameInput] = React.useState("");

  
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
            setIsUsernamePromptOpen("opacity-1 fadeIn")
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

  let createUsernamePromptBody = () => {
    return (
      <>
        <input className="p-1 sm:w-96 text-black" type="text" placeholder="James Murphy"
          value={usernameInput} onChange={e => setUsernameInput(e.target.value)}/>
      </>
    )
  }

  let isUsernameModalInputValid = () => {
    return usernameInput.length > 0
  }

  let submitUsername = () => {
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/refresh-users", {displayName: usernameInput, sessionId: sessionId, command: "ADD", websocketUserId: websocketUserId})
      .then((response) => {
        if(response.data.status !== "SUCCESS") {
          alert(response.data.error);
        }
      })
      .catch((error) => {
        alert("Error while adding displayname to backend\n" + error)
      }); 
  }
  

  return (
    <div>
      {
        connectToWebSocketServer 
          ? <WebSocketClient sessionId={sessionId} setTopics={setTopics} setCurrentTopicEndTime={setCurrentTopicEndTime} setWebsocketUserId={setWebsocketUserId}
              sessionStatus={sessionStatus} setSessionStatus={setSessionStatus} setUsersInAttendance={setUsersInAttendance}/>
          : null
      }

      <Modal fadeType={isUsernamePromptOpen} setFadeType={setIsUsernamePromptOpen} headerText="Enter your name" submitButtonText="Submit"
        body={createUsernamePromptBody} modalInput={null} isModalInputValid={isUsernameModalInputValid}
        modalCloseCallback={submitUsername} letEscape={false}/>

      Session Page!
      <br/>
      Session ID: {sessionId}
      <br/>
      Session Status: {sessionStatus}
    </div>
  )
}