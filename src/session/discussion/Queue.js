import React from 'react'
import TopicCard from '../TopicCard'

export default function Queue(props) {

  let createBacklog = () => {
    if (props.topics === undefined || props.topics.length < 1) {
      return <h3>You've cleared out the discussion queue!</h3>
    } else {
      let topicsElements = []
      props.topics.forEach((topic, i) => {
        topicsElements.push(<li key={i}><p className="float-left m-2">{++i}</p><TopicCard topicBody={topic.text} topicFooter={"Votes: " + topic.voters.length} makeAllWide={true}/></li>)
      })
      return topicsElements
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mt-2">
        <h2>Discussion Queue</h2>
      </div>

      <ol className="list-decimal list-outside overflow-scroll">
        {createBacklog()}
      </ol>
    </div>
  )
}