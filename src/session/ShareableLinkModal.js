import React from 'react'
import Modal from '../Modal'
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ShareableLinkModal(props) {

  let createShareableLinkBody = () => {
    let newSessionUrl = process.env.REACT_APP_FRONTEND_BASEURL + '/session/' + props.sessionId;
    return (
      <>
        <p className="text-white text-lg leading-relaxed text-center">Your meeting link is</p>
        <p className="text-white text-lg leading-relaxed text-center">{newSessionUrl}</p>
        <div className="text-center">
          <CopyToClipboard text={newSessionUrl}>
            <button type="button" className="mt-2 text-white text-lg leading-relaxed outline p-2">Copy to clipboard</button>
          </CopyToClipboard>
        </div>
      </>
    )
  }

  return (
    <Modal fadeType={props.isShareableLinkOpen} setFadeType={props.setIsShareableLinkOpen} headerText="Shareable Link" submitButtonText="Close"
      body={createShareableLinkBody} isModalInputValid={null} modalCloseCallback={()=>{props.setIsShareableLinkOpen("opacity-0 fadeOut")}} letEscape={true}
      bodyProps="break-all"/>
  )
}