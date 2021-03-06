import React from 'react'
import Axios from 'axios'
import Modal from './Modal'

export default function Splash() {

  const [input, setInput] = React.useState("");
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState("opacity-0 fadeOut")
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState("opacity-0 fadeOut")

  let joinSessionModalBody = () => {
    return (
      <>
        <p className="my-4 text-white text-lg leading-relaxed">Enter session link below</p>
        <input className="p-1 sm:w-96 text-black" type="text" placeholder={process.env.REACT_APP_FRONTEND_BASEURL + "/session/67caf957-d01a-4bf2-85db-a4d4bb0fb80e"}
          value={input} onChange={e => setInput(e.target.value)}/>
      </>
    )
  }

  let createSessionModalBody = () => {
    return <p className="my-4 text-white text-lg leading-relaxed">Click below to launch a new Lean Coffree session!</p>
  }

  let isModalInputValid = () => {
    return getSessionGuidFromUrlOrReturnNullIfInvalid(input) !== null
  }

  let joinSession = () => {
    let sessionGuid = getSessionGuidFromUrlOrReturnNullIfInvalid(input);

    if(sessionGuid !== null) {
      Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/verify-session/' + sessionGuid, null)
        .then(function (response) {
          if( response.data.verificationStatus === "VERIFICATION_SUCCESS" && response.data.sessionDetails.sessionId === sessionGuid[0]) {
            window.location = process.env.REACT_APP_FRONTEND_BASEURL + '/session/' + sessionGuid;
          } else {
            alert("Invalid entry")
          }
        })
        .catch(function (error) {
          console.log("Received an error while verifying session: " + error);
          alert("Invalid entry")
        });
    } else {
      alert("Invalid entry")
    }
  }

  let createSession = () => {
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/create-session', null)
      .then((response) => {
        window.location = process.env.REACT_APP_FRONTEND_BASEURL + '/session/' + response.data.id.toString();
      })
      .catch(function (error) {
        console.log("Received an error while creating new session: " + error);
      });
  }

  let getSessionGuidFromUrlOrReturnNullIfInvalid = (sessionUrl) => {
    let matchedUrl = sessionUrl.match(process.env.REACT_APP_SESSION_REGEX);
    return matchedUrl === null
      ? null
      : sessionUrl.match("[0-9, a-f]{8}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{12}");
  }

  return (
    <div className="bg-gray-800 text-center text-gray-100 min-h-screen min-w-screen">
      <div className="pt-3">
        <div className="bg-gray-700 rounded-l-lg ml-5 p-3 text-left sm:pl-10">
          <h1>Lean Coffree, a <b>free</b> Lean Coffee discussion tool</h1>
        </div> 

        {/*todo: replace the below div with a screenshot of app when done*/}
        <div className="bg-red-600 w-85w my-4 h-48w max-h-50h m-auto outline"/>

        <div className="pb-4">
          <button className="p-3 outline hover:bg-gray-900" onClick={() => setIsCreateModalOpen("opacity-1 fadeIn")}>
            <h3>Create a new Lean Coffree session</h3>
          </button>
        </div>
        
        <button className="p-3 outline hover:bg-gray-900" onClick={() => setIsJoinModalOpen("opacity-1 fadeIn")}>
          <h3>Join a Lean Coffree session</h3>
        </button>

        <Modal fadeType={isCreateModalOpen} setFadeType={setIsCreateModalOpen} headerText="Create Lean Coffree Session" submitButtonText="Create Session"
          body={createSessionModalBody} isModalInputValid={null}
          modalCloseCallback={createSession} letEscape={true}/>
        
        <Modal fadeType={isJoinModalOpen} setFadeType={setIsJoinModalOpen} headerText="Join Lean Coffree Session" submitButtonText="Join Session"
          body={joinSessionModalBody} isModalInputValid={isModalInputValid}
          modalCloseCallback={joinSession} letEscape={true}/>
      </div>
    </div>
  );
}
