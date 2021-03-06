import React from 'react'
import Axios from 'axios'
import Modal from '../Modal'

export default function UseranmePromptModal(props) {

  const [usernameInput, setUsernameInput] = React.useState("");

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
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/refresh-users", {displayName: usernameInput, sessionId: props.sessionId, command: "ADD", websocketUserId: props.websocketUserId})
      .then((response) => {
        if(response.data.status !== "SUCCESS") {
          alert(response.data.error);
        } else {
          props.setSessionStatus(response.data.sessionStatus)
          response.data.showShareableLink === true 
            ? props.setIsShareableLinkOpen("opacity-1 fadeIn")
            : props.setIsShareableLinkOpen("opacity-0 fadeOut")
        }
      })
      .catch((error) => {
        alert("Error while adding displayname to backend\n" + error)
      }); 
  }

  return (
    <Modal fadeType={props.isUsernamePromptOpen} setFadeType={props.setIsUsernamePromptOpen} headerText="Enter your name" submitButtonText="Submit"
        body={createUsernamePromptBody} isModalInputValid={isUsernameModalInputValid} modalCloseCallback={submitUsername} letEscape={false}/>
  )
}