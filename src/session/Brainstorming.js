import React from 'react'
import Axios from 'axios'
import TopicCard from './TopicCard'

export default function Brainstorming(props) {

  const [topicInput, setTopicInput] = React.useState("")
  const [votesLeft, setVotesLeft] = React.useState(3)

  let getTopicFooter = (topic) => {
    let deleteButton = (props.username === topic.authorDisplayName || props.users.moderator.includes(props.username))
      ? <button onClick={() => confirmDeleteTopic(topic)} className="outline p-1 text-sm">Delete</button>
      : null
    
    let votingButton = null;
    if (topic.voters.includes(props.username)) {
      votingButton = <button className="outline p-1 text-sm" onClick={() => postVoteForTopic(topic.text, 'UNCAST', topic.authorDisplayName)}>Un-Vote</button>
    } else if (votesLeft > 0) {
      votingButton = <button className="outline p-1 text-sm" onClick={() => postVoteForTopic(topic.text, 'CAST', topic.authorDisplayName)}>Vote</button>
    }

    return (
      <div className="flex h-full justify-between">
        <p className="self-center">Votes: {topic.voters.length}</p>
        {votingButton}
        {deleteButton}
      </div>
    )
  }

  let composeBody = () => {
    return <textarea type="text" placeholder="Submit a topic!"value={topicInput} onChange={e => setTopicInput(e.target.value)} className="resize-none text-white bg-transparent h-full w-full focus:outline-none"/>
  }

  let composeFooter = () => {
    return (
      <div className="flex justify-end">
        <button onClick={submitTopic} className="outline p-1 text-sm">Submit</button>
      </div>
    )
  }

  let submitTopic = () => {
    if (topicInput.length > 0) {
      Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/submit-topic", {submissionText: topicInput, sessionId: props.sessionId, displayName: props.username})
        .then((response) => {
          if(response.data.status === "SUCCESS") {
            setTopicInput("")
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

  let createTopicsDisplay = () => {
    let topics = props.topics.discussionBacklogTopics
    let topicsElements = []

    tabulateVotesLeft()

    topicsElements.push(<TopicCard isCompose={true} topicBody={composeBody()} topicFooter={composeFooter()}/>)

    for (let i = 0; topics !== undefined && i < topics.length; i++) {
      let currTopicText = topics[i].text
      topicsElements.push(<TopicCard topicBody={currTopicText} topicFooter={getTopicFooter(topics[i])}/>)
    }
    
    return topicsElements;
  }

  let tabulateVotesLeft = () => {
    let topics = props.topics.discussionBacklogTopics
    let votesCast = 0
    for (let i = 0; topics !== undefined && i < topics.length; i++) {
      if (topics[i].voters.includes(props.username)) {
        votesCast += 1
      }
    }
    if (votesLeft !== 3 - votesCast) {
      setVotesLeft(3 - votesCast)
    }
  }

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

  return (
      <div className="sm:inline-grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 sm:justify-items-center">{createTopicsDisplay()}</div>
  )
}