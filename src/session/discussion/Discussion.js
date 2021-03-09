import React from 'react'
import Current from './Current'
import Queue from './Queue'

export default function Discussion(props) {

  const [activeTab, setActiveTab] = React.useState("CURRENT")

  let queueButtonStyle = activeTab === "QUEUE"
    ? "shadow-custom"
    : ""

  let currentButtonStyle = activeTab === "CURRENT"
    ? "shadow-custom"
    : ""

  let pastButtonStyle = activeTab === "PAST"
    ? "shadow-custom"
    : ""
  
  return (
    <div className="pb-2">
      <div>
        <button onClick={() => setActiveTab("QUEUE")} className={queueButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr"}>QUEUE</button>
        <button onClick={() => setActiveTab("CURRENT")} className={currentButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr"}>CURRENT</button>
        <button onClick={() => setActiveTab("PAST")} className={pastButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr"}>PAST</button>
      </div>

      <div className="h-70vh sm:h-80vh m-auto w-85w border rounded">
        {activeTab === "QUEUE"
            ? <Queue topics={props.topics.discussionBacklogTopics} sessionId={props.sessionId} setIsAlertVisible={props.setIsAlertVisible} setAlertText={props.setAlertText}
                isModerator={props.isModerator} setTopics={props.setBacklogTopics}/>
            : activeTab === "PAST"
              ? "PAST"
              : <Current topic={props.topics.currentDiscussionItem}/>}
      </div>
    </div>
  )
}