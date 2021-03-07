import React from 'react'
import Axios from 'axios'
import WebSocketClient from './WebSocketClient'
import UseranmePromptModal from './UsernamePromptModal'
import ShareableLinkModal from './ShareableLinkModal'
import NavBar from '../NavBar'
import Brainstorming from './Brainstorming'

export default function Session(props) {

  const [sessionId, setSessionId] = React.useState("");
  const [sessionStatus, setSessionStatus] = React.useState("");
  const [topics, setTopics] = React.useState([]);
  const [currentTopicEndTime, setCurrentTopicEndTime] = React.useState("");
  const [usersInAttendance, setUsersInAttendance] = React.useState([]);
  const [websocketUserId, setWebsocketUserId] = React.useState("");
  const [connectToWebSocketServer, setConnectToWebSocketServer] = React.useState(false);
  const [isUsernamePromptOpen, setIsUsernamePromptOpen] = React.useState("opacity-0 fadeOut")
  const [isShareableLinkOpen, setIsShareableLinkOpen] = React.useState("opacity-0 fadeOut")
  const [username, setUsername] = React.useState("")
  
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
            setConnectToWebSocketServer(true);
            setSessionId(response.data.sessionDetails.sessionId);
            setSessionStatus(response.data.sessionDetails.sessionStatus);
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

  return (
    <div className="bg-gray-800 text-center text-gray-100 min-h-screen min-w-screen">
      <div className="pt-3">
  
        {/*Nav Bar*/}
        <NavBar shortText={true} showUserButton={true} users={usersInAttendance}/>

        {/*Active Tab*/}
        <Brainstorming topics={topics} setIsAlertVisible={props.setIsAlertVisible} setAlertText={props.setAlertText}
          sessionId={sessionId} username={username} users={usersInAttendance} setConfirmationCallback={props.setConfirmationCallback}/>

        {connectToWebSocketServer 
          ? <WebSocketClient sessionId={sessionId} setTopics={setTopics} setCurrentTopicEndTime={setCurrentTopicEndTime} setWebsocketUserId={setWebsocketUserId}
              sessionStatus={sessionStatus} setSessionStatus={setSessionStatus} setUsersInAttendance={setUsersInAttendance}
              setIsAlertVisible={props.setIsAlertVisible} setAlertText={props.setAlertText}/>
          : null}

        {/*Background or alway present helpers*/}
        <UseranmePromptModal sessionId={sessionId} websocketUserId={websocketUserId} setSessionStatus={setSessionStatus}
          setIsShareableLinkOpen={setIsShareableLinkOpen} isUsernamePromptOpen={isUsernamePromptOpen} setIsUsernamePromptOpen={setIsUsernamePromptOpen}
          isAlertVisible={props.isAlertVisible} setIsAlertVisible={props.setIsAlertVisible} setAlertText={props.setAlertText} setUsername={setUsername}/>

        <ShareableLinkModal sessionId={sessionId} isShareableLinkOpen={isShareableLinkOpen} setIsShareableLinkOpen={setIsShareableLinkOpen}/>

      </div>
    </div>
  )
}