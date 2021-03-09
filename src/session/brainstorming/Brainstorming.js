import React from 'react'
import TopicCard from '../TopicCard'
import TopicFooter from './TopicFooter'
import ComposeFooter from './ComposeFooter'

export default function Brainstorming(props) {

  const [topicInput, setTopicInput] = React.useState("")
  const [votesLeft, setVotesLeft] = React.useState(3)

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

  let createTopicsDisplay = () => {
    let topics = props.topics.discussionBacklogTopics
    let topicsElements = []

    tabulateVotesLeft()

    if (topics !== undefined && topics.length > 1 && props.sessionStatus === "STARTED" && props.users.moderator.includes(props.username)) {      
      topicsElements.push(<button onClick={props.confirmTransitionToNextSection} className="hover:bg-gray-900 focus:bg-black outline p-1 mt-2 w-full sm:hidden">Next Section</button>)
    }

    let composeFooter = <ComposeFooter topicInput={topicInput} setTopicInput={setTopicInput} sessionId={props.sessionId} username={props.username} setAlertText={props.setAlertText} setIsAlertVisible={props.setIsAlertVisible}/>
    let composeBody = <textarea type="text" placeholder="Submit a topic!"value={topicInput} onChange={e => setTopicInput(e.target.value)} className="resize-none text-white bg-transparent h-full w-full focus:outline-none"/>
    topicsElements.push(<TopicCard disableOverflowScroll={true} topicBody={composeBody} topicFooter={composeFooter}/>)

    for (let i = 0; topics !== undefined && i < topics.length; i++) {
      let currTopicText = topics[i].text
      
      let topicFooter = <TopicFooter sessionId={props.sessionId} username={props.username} setAlertText={props.setAlertText} setIsAlertVisible={props.setIsAlertVisible} 
                    setConfirmationCallback={props.setConfirmationCallback} topic={topics[i]} users={props.users} votesLeft={votesLeft}/>
      topicsElements.push(<TopicCard topicBody={currTopicText} topicFooter={topicFooter}/>)
    }
    return topicsElements;
  }

  return (
      <div className="sm:inline-grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 sm:justify-items-center">
        {createTopicsDisplay()}
      </div>
  )
}