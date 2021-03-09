import React from 'react'
import Axios from 'axios'

export default function DiscussionTopicFooter(props) {

  let confirmDeleteTopic = (topic) => {
    props.setAlertText("Confirm deletion of following topic: " + topic.text)
    props.setConfirmationCallback(() => () => deleteTopic(topic.text, topic.authorDisplayName));
    props.setIsAlertVisible(true)
  }

  let deleteTopic = (text, authorDisplayName) => {
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/delete-topic', {sessionId: props.sessionId, topicText: text, authorName: authorDisplayName})
      .then((response) => {
        if(response.data.status !== "SUCCESS") {
          props.setAlertText("Invalid submission, please fix and retry")
          props.setIsAlertVisible(true)
        }
      })
      .catch((error) => {
        props.setAlertText("An error occurred, please try again")
        props.setIsAlertVisible(true)
      });
  }

  let confirmDiscussTopic = (topic) => {
    let confirmationMessage = props.isAnyTopicActive === true 
      ? "End current topic, move to: " + topic.text 
      : "Pull the following topic for discussion: " + topic.text
    props.setAlertText(confirmationMessage)
    props.setConfirmationCallback(() => () => discussTopic(topic));
    props.setIsAlertVisible(true)
  }

  let discussTopic = (topic) => {
    let body = props.isAnyTopicActive === false
      ? {command: "REVERT_TO_DISCUSSION", sessionId: props.sessionId, nextTopicText: topic.text, nextTopicAuthorDisplayName: topic.authorDisplayName}
      : {command: "NEXT", sessionId: props.sessionId, currentTopicText: props.currentDiscussionItem.text, nextTopicText: topic.text, currentTopicAuthorDisplayName: props.currentDiscussionItem.authorDisplayName, nextTopicAuthorDisplayName: topic.authorDisplayName};

    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/refresh-topics", body)
      .then((response) => {
        if(response.data.status !== "SUCCESS") {
          props.setAlertText("Invalid submission, please fix and retry")
          props.setIsAlertVisible(true)
        }
      })
      .catch((error) => {
        props.setAlertText("An error occurred, please try again")
        props.setIsAlertVisible(true)
      }); 
  }

  let deleteButton = (props.isModerator === true)
    ? <button onClick={() => confirmDeleteTopic(props.topic)} className="hover:bg-gray-900 focus:bg-black outline p-1 text-sm">Delete</button>
    : <div/>

  let discussButton = (props.isModerator === true)
    ? <button onClick={() => confirmDiscussTopic(props.topic)} className="hover:bg-gray-900 focus:bg-black outline p-1 text-sm">Discuss</button>
    : <div/>

  return (
    <div className="flex h-full justify-between">
      {deleteButton}
      <p className="self-center">Votes: {props.topic.voters.length}</p>
      {discussButton}
    </div>
  )
}