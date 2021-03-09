import React from 'react'
import Current from './Current'
import Queue from './Queue'
import Past from './Past'

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
        <button onClick={() => setActiveTab("QUEUE")} className={queueButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr hover:text-gray-300 focus:text-gray-400"}>QUEUE</button>
        <button onClick={() => setActiveTab("CURRENT")} className={currentButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr hover:text-gray-300 focus:text-gray-400"}>CURRENT</button>
        <button onClick={() => setActiveTab("PAST")} className={pastButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr hover:text-gray-300 focus:text-gray-400"}>PAST</button>
      </div>

      <div className="h-70vh sm:h-80vh m-auto w-85w border rounded">
        {activeTab === "QUEUE"
            ? <Queue topics={props.topics.discussionBacklogTopics} sessionId={props.sessionId} setIsAlertVisible={props.setIsAlertVisible} setAlertText={props.setAlertText}
                isModerator={props.isModerator} setTopics={props.setBacklogTopics} setConfirmationCallback={props.setConfirmationCallback} 
                currentDiscussionItem={props.topics.currentDiscussionItem}/>
            : activeTab === "PAST"
              ? <Past setIsAlertVisible={props.setIsAlertVisible} setAlertText={props.setAlertText} setConfirmationCallback={props.setConfirmationCallback}
                  topics={props.topics.discussedTopics} currentDiscussionItem={props.topics.currentDiscussionItem} sessionId={props.sessionId} isModerator={props.isModerator} 
                  isAnyTopicActive={props.topics.currentDiscussionItem !== undefined && props.topics.currentDiscussionItem.text !== undefined}/>
              : <Current topic={props.topics.currentDiscussionItem}/>}
      </div>
    </div>
  )
}