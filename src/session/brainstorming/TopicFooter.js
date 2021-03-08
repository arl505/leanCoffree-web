import React from 'react'
import Axios from 'axios'

export default function TopicFooter(props) {

  let postVoteForTopic = (topicText, commandType, authorDisplayName) => {
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/post-vote", {command: commandType, sessionId: props.sessionId, text: topicText, voterDisplayName: props.username, authorDisplayName: authorDisplayName})
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

  let deleteButton = (props.username === props.topic.authorDisplayName || props.users.moderator.includes(props.username))
      ? <button onClick={() => confirmDeleteTopic(props.topic)} className="outline p-1 text-sm">Delete</button>
      : null
    
  let votingButton = () => {
    let button = null
    if (props.topic.voters.includes(props.username)) {
      button = <button className="outline p-1 text-sm" onClick={() => postVoteForTopic(props.topic.text, 'UNCAST', props.topic.authorDisplayName)}>Un-Vote</button>
    } else if (props.votesLeft > 0) {
      button = <button className="outline p-1 text-sm" onClick={() => postVoteForTopic(props.topic.text, 'CAST', props.topic.authorDisplayName)}>Vote</button>
    }
    return button
  }

  return (
    <div className="flex h-full justify-between">
      <p className="self-center">Votes: {props.topic.voters.length}</p>
      {votingButton()}
      {deleteButton}
    </div>
  )
}