import React from 'react'
import Axios from 'axios'

export default function ComposeFooter(props) {

  let submitTopic = () => {
    if (props.topicInput.length > 0) {
      Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/submit-topic", {submissionText: props.topicInput, sessionId: props.sessionId, displayName: props.username})
        .then((response) => {
          if(response.data.status === "SUCCESS") {
            props.setTopicInput("")
          } else {
            props.setAlertText("Invalid submission, please fix and retry")
            props.setIsAlertVisible(true)
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
    <div className="flex justify-end">
      <button onClick={submitTopic} className="outline p-1 text-sm">Submit</button>
    </div>
  )
}