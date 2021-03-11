import React from 'react'
import Axios from 'axios'

export default function Current(props) {

  let confirmLoadNextTopic = () => {
    props.setAlertText("End current topic?")
    props.setConfirmationCallback(() => () => loadNextTopic());
    props.setIsAlertVisible(true)
  }

  let loadNextTopic = () => {
    let nextTopic = props.discussionBacklogTopics === undefined || props.discussionBacklogTopics.length < 1
      ? undefined
      : props.discussionBacklogTopics[0]
    
    let body = nextTopic !== undefined
      ? {command: "NEXT", sessionId: props.sessionId, currentTopicText: props.topic.text, nextTopicText: nextTopic.text, currentTopicAuthorDisplayName: props.topic.authorDisplayName, nextTopicAuthorDisplayName: nextTopic.authorDisplayName}
      : {command: "FINISH", sessionId: props.sessionId, currentTopicText: props.topic.text, currentTopicAuthorDisplayName: props.topic.authorDisplayName};
    
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/refresh-topics", body)
  }

  let confirmEndSession = () => {
    props.setAlertText("Are you sure you'd like to end the session?")
    props.setConfirmationCallback(() => () => endSession());
    props.setIsAlertVisible(true)
  }

  let endSession = () => {
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/end-session/' + props.sessionId, {})
      .then((response) => {
        if(response.data.status !== "SUCCESS") {
          props.setAlertText("Invalid submission, please fix and retry")
          props.setIsAlertVisible(true)        
        } else {
          return window.location = process.env.REACT_APP_FRONTEND_BASEURL;
        }
      })
      .catch((error) => {
        props.setAlertText("An error occurred, please try again")
        props.setIsAlertVisible(true)
      });
  }

  let endTopicButton = props.isModerator === true && (props.topic !== undefined && props.topic.text !== undefined)
    ? <button onClick={confirmLoadNextTopic} className="hover:bg-gray-900 focus:bg-black outline ml-1 p-1 text-sm">End Topic</button>
    : <button onClick={confirmLoadNextTopic} className="invisible hover:bg-gray-900 focus:bg-black outline ml-1 p-1 text-sm">End Topic</button>

  let endSessionButton = props.isModerator === true 
    ? <button onClick={confirmEndSession} className="hover:bg-gray-900 focus:bg-black outline mr-1 p-1 text-sm">End Session</button>
    : <button onClick={confirmEndSession} className="invisible hover:bg-gray-900 focus:bg-black outline mr-1 p-1 text-sm">End Session</button>

  let mainText = props.topic === undefined || props.topic.text === undefined 
    ? "All conversation topics completed!"
    : props.topic.text

  return (
    <div className="h-full flex flex-col">
      <div className="mt-2">
        <h2>Current Discussion Topic</h2>
      </div>
      
      <div className="overflow-scroll px-5 mt-2">
        <h1>{mainText}</h1>
      </div>

      <div className="flex flex-grow flex-col justify-end mt-3">
        <div className="flex flex-row justify-between">
          {endTopicButton}
          <h2>{props.timerString}</h2>
          {endSessionButton}
        </div>
      </div>
    </div>
  )
}

