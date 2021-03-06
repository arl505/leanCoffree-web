import React from 'react'
import Axios from 'axios'
import Modal from '../Modal'

export default function JoinSessionButtonModal(props) {

  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState("opacity-0 fadeOut")
  const [input, setInput] = React.useState("");
  
  let joinSessionModalBody = () => {
    return (
      <>
        <p className="my-4 text-white text-lg leading-relaxed">Enter session link below</p>
        <input className="p-1 sm:w-96 text-black" type="text" placeholder={process.env.REACT_APP_FRONTEND_BASEURL + "/session/67caf957-d01a-4bf2-85db-a4d4bb0fb80e"}
          value={input} onChange={e => setInput(e.target.value)} inputMode="search" onKeyDown={blur}/>
      </>
    )
  }

  let blur = (event) => {
    if (event.key === "Enter") {
      event.target.blur()
      joinSession()
    }
  }

  let getSessionGuidFromUrlOrReturnNullIfInvalid = (sessionUrl) => {
    let matchedUrl = sessionUrl.match(process.env.REACT_APP_SESSION_REGEX);
    return matchedUrl === null
      ? null
      : sessionUrl.match("[0-9, a-f]{8}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{12}");
  }

  let joinSession = () => {
    let sessionGuid = getSessionGuidFromUrlOrReturnNullIfInvalid(input);

    if(sessionGuid !== null) {
      Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/verify-session/' + sessionGuid, null)
        .then(function (response) {
          if(response.data.verificationStatus === "VERIFICATION_SUCCESS" && response.data.sessionDetails.sessionId === sessionGuid[0]) {
            setIsJoinModalOpen("opacity-0 fadeOut")
            window.location = process.env.REACT_APP_FRONTEND_BASEURL + '/session/' + sessionGuid;
          } else {
            props.setAlertText("Invalid submission. No session found, please retry")
            props.setIsAlertVisible(true)
          }
        })
        .catch(function (error) {
          props.setAlertText("An error occurred, please try again")
          props.setIsAlertVisible(true)
        });
    } else {
      props.setAlertText("Invalid submission, please fix and retry")
      props.setIsAlertVisible(true)
    }
  }

  return (
    <>
      <button className="p-3 outline hover:bg-gray-900" onClick={() => setIsJoinModalOpen("opacity-1 fadeIn")}>
        <h3>Join a Lean Coffree session</h3>
      </button>

      <Modal fadeType={isJoinModalOpen} setFadeType={setIsJoinModalOpen} headerText="Join Lean Coffree Session" submitButtonText="Join Session"
          body={joinSessionModalBody} letEscape={true} isAlertVisible={props.isAlertVisible} setInput={setInput}
          modalCloseCallback={joinSession} bodyProps="break-none"/>
    </>
  )
}