import React from 'react'
import Axios from 'axios'
import Modal from '../Modal'

export default function CreateSessionButtonModal(props) {

  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState("opacity-0 fadeOut")

  let createSessionModalBody = () => {
    return <p className="my-4 text-white text-lg leading-relaxed">Click below to launch a new Lean Coffree session!</p>
  }

  let createSession = () => {
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/create-session', null)
      .then((response) => {
        window.location = process.env.REACT_APP_FRONTEND_BASEURL + '/session/' + response.data.id.toString();
      })
      .catch(function (error) {
        props.setAlertText("An error occurred, please try again")
        props.setIsAlertVisible(true)
      });
  }
  
  return (
    <>
      <div className="pb-4">
        <button className="p-3 outline hover:bg-gray-900" onClick={() => setIsCreateModalOpen("opacity-1 fadeIn")}>
          <h3>Create a new Lean Coffree session</h3>
        </button>
      </div>

      <Modal fadeType={isCreateModalOpen} setFadeType={setIsCreateModalOpen} headerText="Create Lean Coffree Session" submitButtonText="Create Session"
          body={createSessionModalBody} modalCloseCallback={createSession} letEscape={true} bodyProps="break-none" isAlertVisible={props.isAlertVisible}/>
    </>
  )
}