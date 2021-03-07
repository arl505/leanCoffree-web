import React from 'react'
import Axios from 'axios'
import TopicCard from './TopicCard'

export default function Brainstorming(props) {

  const [topicInput, setTopicInput] = React.useState("");

  let getTopicFooter = () => {
    return <div/>
  }

  let composeBody = () => {
    return <textarea type="text" placeholder="Submit a topic!"value={topicInput} onChange={e => setTopicInput(e.target.value)} className="resize-none text-white bg-transparent h-full w-full focus:outline-none"/>
  }

  let composeFooter = () => {
    return (
      <div className="text-right">
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
            alert(response.data.error);
          }
        })
        .catch((error) => 
          alert("Unable to subit discussion topic\n" + error)
        );
    } else {
      props.setAlertText("Invalid submission, please fix and retry")
      props.setIsAlertVisible(true)
    }
  }

  let createTopicsDisplay = () => {
    let topics = props.topics.discussionBacklogTopics
    let topicsElements = []

    topicsElements.push(<TopicCard isCompose={true} topicBody={composeBody()} topicFooter={composeFooter()}/>)

    for (let i = 0; topics !== undefined && i < topics.length; i++) {
      let currTopicText = topics[i].text
      topicsElements.push(<TopicCard topicBody={currTopicText} topicFooter={getTopicFooter()}/>)
    }
    
    return topicsElements;
  }

  return (
      <div className="sm:inline-grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-10 sm:justify-items-center">{createTopicsDisplay()}</div>
  )
}