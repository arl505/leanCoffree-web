import React from 'react'
import TopicCard from './TopicCard'

export default function Brainstorming(props) {

  let getTopicFooter = () => {
    return <div/>
  }

  let createTopicsDisplay = () => {
    if (props.topics.discussionBacklogTopics === undefined || props.topics.discussionBacklogTopics.length === 0){
      return
    } else {
      let topics = props.topics.discussionBacklogTopics
      let topicsElements = []
      for (let i = 0; i < topics.length; i++) {
        let currTopicText = topics[i].text
        topicsElements.push(<TopicCard topicText={currTopicText} topicFooter={getTopicFooter()}/>)
      }
      return topicsElements;
    }
  }

  return <div className="flex flex-wrap justify-evenly">{createTopicsDisplay()}</div>
}