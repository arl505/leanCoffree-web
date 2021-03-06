import React from 'react'
import Axios from 'axios'
import Modal from '../Modal'

export default function UseranmePromptModal(props) {

  const [usernameInput, setUsernameInput] = React.useState("");

  let createUsernamePromptBody = () => {
    return (
      <>
        <input className="p-1 sm:w-96 text-black" type="text" placeholder="James Murphy" inputMode="search"
          value={usernameInput} onChange={e => setUsernameInput(e.target.value)} onKeyDown={blur}/>
      </>
    )
  }

  let blur = (event) => {
    if (event.key === "Enter") {
      event.target.blur()
      submitUsername()
    }
  }

  let submitUsername = () => {
    if (usernameInput.length > 0) {
      Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/refresh-users", {displayName: usernameInput, sessionId: props.sessionId, command: "ADD", websocketUserId: props.websocketUserId})
        .then((response) => {
          if(response.data.status !== "SUCCESS") {
            props.setAlertText("An error occurred, please try again")
            props.setIsAlertVisible(true)
          } else {
            props.setSessionStatus(response.data.sessionStatus)
            props.setIsUsernamePromptOpen("opacity-0 fadeOut")
            response.data.showShareableLink === true 
              ? props.setIsShareableLinkOpen("opacity-1 fadeIn")
              : props.setIsShareableLinkOpen("opacity-0 fadeOut")
          }
        })
        .catch((error) => {
          props.setAlertText("An error occurred, please try again")
          props.setIsAlertVisible(true)
        });
    } else {
      props.setAlertText("Invalid submission, please fix and retry")
      props.setIsAlertVisible(true)
    }
  }

  return (
    <Modal fadeType={props.isUsernamePromptOpen} setFadeType={props.setIsUsernamePromptOpen} headerText="Enter your name" submitButtonText="Submit"
      body={createUsernamePromptBody} modalCloseCallback={submitUsername} letEscape={false} isAlertVisible={props.isAlertVisible} bodyProps="break-none"/>
  )
}