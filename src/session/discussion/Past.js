import React from 'react'
import TopicCard from '../TopicCard'
import DiscussionTopicFooter from './DiscussionTopicFooter'

export default function Past(props) {

  let createDisplay = () => {
    if (props.topics === undefined || props.topics.length < 1) {
      return <h3>Topics will appear here after they've been discussed</h3>
    } else {
      return (
        <>
          {props.topics.map((topic, i) => { 
            let backlogTopicFooter = (
              <DiscussionTopicFooter setAlertText={props.setAlertText} setIsAlertVisible={props.setIsAlertVisible} topic={topic} isAnyTopicActive={true}
                setConfirmationCallback={props.setConfirmationCallback} sessionId={props.sessionId} isModerator={props.isModerator} currentDiscussionItem={props.currentDiscussionItem}/>)
            return (
              <div  className="p-2" key={i}>
                <TopicCard topicBody={topic.text} topicFooter={backlogTopicFooter} makeAllWide={true}/>
              </div>
          )})}
        </>
      )
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mt-2">
        <h2>Past Topics</h2>
      </div>

      <div className="h-full overflow-scroll">
        {createDisplay()}
      </div>
    </div>
  )
}