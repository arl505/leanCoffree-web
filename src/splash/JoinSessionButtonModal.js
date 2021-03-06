import React from 'react'
import Axios from 'axios'
import Modal from '../Modal'

export default function JoinSJoinSessionButtonModalessionModal() {

  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState("opacity-0 fadeOut")
  const [input, setInput] = React.useState("");
  
  let joinSessionModalBody = () => {
    return (
      <>
        <p className="my-4 text-white text-lg leading-relaxed">Enter session link below</p>
        <input className="p-1 sm:w-96 text-black" type="text" placeholder={process.env.REACT_APP_FRONTEND_BASEURL + "/session/67caf957-d01a-4bf2-85db-a4d4bb0fb80e"}
          value={input} onChange={e => setInput(e.target.value)} inputmode="search"/>
      </>
    )
  }

  let isModalInputValid = () => {
    return getSessionGuidFromUrlOrReturnNullIfInvalid(input) !== null
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
            window.location = process.env.REACT_APP_FRONTEND_BASEURL + '/session/' + sessionGuid;
          } else {
            alert("Invalid submission")
          }
        })
        .catch(function (error) {
          console.log("Received an error while verifying session: " + error);
          alert("Invalid submission")
        });
    } else {
      alert("Invalid submission")
    }
  }

  return (
    <>
      <button className="p-3 outline hover:bg-gray-900" onClick={() => setIsJoinModalOpen("opacity-1 fadeIn")}>
        <h3>Join a Lean Coffree session</h3>
      </button>

      <Modal fadeType={isJoinModalOpen} setFadeType={setIsJoinModalOpen} headerText="Join Lean Coffree Session" submitButtonText="Join Session"
          body={joinSessionModalBody} isModalInputValid={isModalInputValid}
          modalCloseCallback={joinSession} letEscape={true} bodyProps="break-none"/>
    </>
  )
}