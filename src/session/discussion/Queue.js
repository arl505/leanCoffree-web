import React from 'react'
import Axios from 'axios'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TopicCard from '../TopicCard'
import DiscussionTopicFooter from './DiscussionTopicFooter'

export default function Queue(props) {

  let onDragEnd = (result) => {
    if (!result.destination || props.topics === undefined || props.topics.length < 2) {
      return;
    }

    let topics = props.topics
    let topic = topics[result.source.index]

    topics.splice(result.source.index, 1)
    topics.splice(result.destination.index, 0, topic)
    props.setTopics(topics)

    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/reorder', {sessionId: props.sessionId, text: topic.text, newIndex: result.destination.index})
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

  let createBacklog = () => {
    if (props.topics === undefined || 1 > props.topics.length ) {
      return <h3>You've cleared out the discussion queue!</h3>
    } else if (2 <= props.topics.length && props.isModerator === true) {
      return (
        <div className="h-full">
          <h3 className="h-10p">Drag and Drop Topics To Reorder</h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div className="" {...provided.droppableProps} ref={provided.innerRef}>
                  {props.topics.map((topic, i) => { 
                    let backlogTopicFooter = (
                      <DiscussionTopicFooter setAlertText={props.setAlertText} setIsAlertVisible={props.setIsAlertVisible} topic={topic} isAnyTopicActive={true}
                        setConfirmationCallback={props.setConfirmationCallback} sessionId={props.sessionId} isModerator={props.isModerator} currentDiscussionItem={props.currentDiscussionItem}/>)
                    return (
                      <Draggable key={i} draggableId={'draggable_' + i} index={i}>
                        {(provided) => (
                          <div className="p-2 overflow-scroll" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={i}>
                            <p className="float-left">{1 + i}</p>
                            <TopicCard topicBody={topic.text} topicFooter={backlogTopicFooter} makeAllWide={true}/>
                          </div>
                        )}
                      </Draggable>
                  )})}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )
    } else {
        return (
        <>
          {props.topics.map((topic, i) => { 
            let backlogTopicFooter = (
              <DiscussionTopicFooter setAlertText={props.setAlertText} setIsAlertVisible={props.setIsAlertVisible} topic={topic} isAnyTopicActive={true}
                setConfirmationCallback={props.setConfirmationCallback} sessionId={props.sessionId} isModerator={props.isModerator} currentDiscussionItem={props.currentDiscussionItem}/>)
            return (
              <div  className="p-2" key={i}>
                <p className="float-left m-2">{1 + i}</p>
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
        <h2>Discussion Queue</h2>
      </div>

      <div className="h-full overflow-scroll">
        {createBacklog()}
      </div>
    </div>
  )
}