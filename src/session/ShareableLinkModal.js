import React from 'react'
import Modal from '../Modal'
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ShareableLinkModal(props) {

  const [copied, setCopied] = React.useState(false)

  let createShareableLinkBody = () => {
    let newSessionUrl = process.env.REACT_APP_FRONTEND_BASEURL + '/session/' + props.sessionId;
    let copyConfirmation = copied ? <p className="text-white text-lg leading-relaxed text-center">Copied to Clipboard ✅</p> : null
    return (
      <>
        <p className="text-white text-lg leading-relaxed text-center">Your meeting link is</p>
        <p className="text-white text-lg leading-relaxed text-center">{newSessionUrl}</p>
        <div className="">
          <CopyToClipboard text={newSessionUrl} onCopy={() => setCopied(true)}>
            <button className="inline-block mt-2 text-white text-lg leading-relaxed outline p-2 hover:bg-gray-900 focus:bg-black" type="button">Copy to clipboard</button>
          </CopyToClipboard>
        </div>
        {copyConfirmation}
      </>
    )
  }

  return (
    <Modal fadeType={props.isShareableLinkOpen} setFadeType={props.setIsShareableLinkOpen} headerText="Shareable Link" submitButtonText="Close"
      body={createShareableLinkBody} modalCloseCallback={()=>{props.setIsShareableLinkOpen("opacity-0 fadeOut")}} letEscape={true}
      bodyProps="break-all"/>
  )
}