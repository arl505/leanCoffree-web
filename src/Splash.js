import React from 'react'
import Axios from 'axios'
import ButtonModal from './ButtonModal'

export default function Splash() {

  const [input, setInput] = React.useState("");

  let joinSessionModalBody = () => {
    return (
      <>
        <p className="my-4 text-gray-100 text-lg leading-relaxed">Enter session link below</p>
        <input className="p-1 sm:w-96 text-black" type="text" placeholder={process.env.REACT_APP_FRONTEND_BASEURL + "/session/67caf957-d01a-4bf2-85db-a4d4bb0fb80e"}
          value={input} onChange={e => setInput(e.target.value)}/>
      </>
    )
  }

  let createSessionModalBody = () => {
    return <p className="my-4 text-gray-100 text-lg leading-relaxed">Click below to launch a new Lean Coffree session!</p>
  }

  let getSessionGuidFromUrlOrReturnNullIfInvalid = (sessionUrl) => {
    let matchedUrl = sessionUrl.match(process.env.REACT_APP_SESSION_REGEX);
    return matchedUrl === null
      ? null
      : sessionUrl.match("[0-9, a-f]{8}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{4}-[0-9, a-f]{12}");
  }

  let isModalInputValid = () => {
    return getSessionGuidFromUrlOrReturnNullIfInvalid(input) !== null
  }

  let joinSession = () => {
    let sessionGuid = getSessionGuidFromUrlOrReturnNullIfInvalid(input);

    if(sessionGuid !== null) {
      Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/verify-session/' + sessionGuid, null)
        .then(function (response) {
          if(isVerificationResponseValid(response, sessionGuid[0])) {
            window.location = process.env.REACT_APP_FRONTEND_BASEURL + '/session/' + sessionGuid;
          }
        })
        .catch(function (error) {
          console.log("Received an error while verifying session: " + error);
        });
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

  let isVerificationResponseValid = (response, sessionGuid) => {
    return response.data.verificationStatus === "VERIFICATION_SUCCESS" && response.data.sessionDetails.sessionId === sessionGuid;
  }

  return (
    <div className="bg-gray-800 text-center text-gray-100 min-h-screen min-w-screen">
      <div className="pt-3">
        <div className="bg-gray-700 rounded-l-lg ml-5 p-3 text-left sm:pl-10">
          <h1>Lean Coffree, a <b>free</b> Lean Coffee discussion tool</h1>
        </div> 

        <br/>

        {/*todo: replace the below div with a screenshot of app when done*/}
        <div className="bg-red-600 w-85w h-48w max-h-50h m-auto outline"/>

        <br/>

        <ButtonModal headerText="Create a Lean Coffree Session" submitButtonText="Create Session"
          entryButtonText="Create a new Lean Coffree session"
          body={createSessionModalBody} isModalInputValid={null} modalInput={null}
          modalCloseCallback={createSession}/>
        
        <br/>

        <ButtonModal headerText="Join a Lean Coffree Session" submitButtonText="Join Session"
          entryButtonText="Join Lean Coffree session"
          body={joinSessionModalBody} isModalInputValid={isModalInputValid} modalInput={input}
          modalCloseCallback={joinSession}/>
      </div>
    </div>
  );
}
