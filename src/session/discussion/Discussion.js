import React from 'react'
import Axios from 'axios'
import Current from './Current'
import Queue from './Queue'
import Past from './Past'
import Modal from '../../Modal'
import TopicEndModalBody from './TopicEndModalBody'

class Discussion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: "CURRENT",
      timerString: ""
    }
    this.loadNextTopic = this.loadNextTopic.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.topics !== undefined && this.props.topics.currentDiscussionItem !== undefined && this.props.topics.currentDiscussionItem.endTime !== undefined) {
        const timestamp = Date.parse(this.props.topics.currentDiscussionItem.endTime)
        let secondsLeft = Math.max(0, Math.round((timestamp - Date.now()) / 1000))
        let result = this.getTimerStringFromSecondsLeft(secondsLeft)
        if (this.state.timerString !== result) {
          this.setState({timerString: result})
        }
      } else if (this.state.timerString !== "") {
        this.setState({timerString: ""})
      }
    }, 500);
  }

  getTimerStringFromSecondsLeft(secondsLeft) {
    let min = Math.floor(secondsLeft / 60)
    let seconds = Math.floor(secondsLeft % 60)
    let sec = seconds.toString()
    if (sec.length < 2) {
      sec = '0' + sec
    }
    return min + ':' + sec;
  }

  loadNextTopic() {
    let nextTopic = this.props.topics.discussionBacklogTopics === undefined || this.props.topics.discussionBacklogTopics.length < 1
      ? undefined
      : this.props.topics.discussionBacklogTopics[0]
    
    let body = nextTopic !== undefined
      ? {command: "NEXT", sessionId: this.props.sessionId, currentTopicText: this.props.topics.currentDiscussionItem.text, nextTopicText: nextTopic.text, currentTopicAuthorDisplayName: this.props.topics.currentDiscussionItem.authorDisplayName, nextTopicAuthorDisplayName: nextTopic.authorDisplayName}
      : {command: "FINISH", sessionId: this.props.sessionId, currentTopicText: this.props.topics.currentDiscussionItem.text, currentTopicAuthorDisplayName: this.props.topics.currentDiscussionItem.authorDisplayName};
    
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/refresh-topics", body)
  }

  render() {
    let queueButtonStyle = this.state.activeTab === "QUEUE"
      ? "shadow-custom"
      : ""

    let currentButtonStyle = this.state.activeTab === "CURRENT"
      ? "shadow-custom"
      : ""

    let pastButtonStyle = this.state.activeTab === "PAST"
      ? "shadow-custom"
      : ""

    let modalBody = this.state.timerString === "0:00" 
      ? <TopicEndModalBody isModerator={this.props.isModerator} sessionId={this.props.sessionId} username={this.props.username} discussionVotes={this.props.discussionVotes} loadNextTopic={this.loadNextTopic}/>
      : null

    return (
      <div className="pb-2">
        <div>
          <button onClick={() => this.setState({activeTab: "QUEUE"})} className={queueButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr hover:text-gray-300 focus:text-gray-400"}>QUEUE</button>
          <button onClick={() => this.setState({activeTab: "CURRENT"})} className={currentButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr hover:text-gray-300 focus:text-gray-400"}>CURRENT</button>
          <button onClick={() => this.setState({activeTab: "PAST"})} className={pastButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr hover:text-gray-300 focus:text-gray-400"}>PAST</button>
        </div>

        <div className="h-70vh sm:h-80vh m-auto w-85w border rounded">
          {this.state.activeTab === "QUEUE"
              ? <Queue topics={this.props.topics.discussionBacklogTopics} sessionId={this.props.sessionId} setIsAlertVisible={this.props.setIsAlertVisible} setAlertText={this.props.setAlertText}
                  isModerator={this.props.isModerator} setTopics={this.props.setBacklogTopics} setConfirmationCallback={this.props.setConfirmationCallback} 
                  currentDiscussionItem={this.props.topics.currentDiscussionItem}/>
              : this.state.activeTab === "PAST"
                ? <Past setIsAlertVisible={this.props.setIsAlertVisible} setAlertText={this.props.setAlertText} setConfirmationCallback={this.props.setConfirmationCallback}
                    topics={this.props.topics.discussedTopics} currentDiscussionItem={this.props.topics.currentDiscussionItem} sessionId={this.props.sessionId} isModerator={this.props.isModerator} 
                    isAnyTopicActive={this.props.topics.currentDiscussionItem !== undefined && this.props.topics.currentDiscussionItem.text !== undefined}/>
                : <Current setIsAlertVisible={this.props.setIsAlertVisible} setAlertText={this.props.setAlertText} setConfirmationCallback={this.props.setConfirmationCallback}
                    topic={this.props.topics.currentDiscussionItem} isModerator={this.props.isModerator} loadNextTopic={this.loadNextTopic}
                    sessionId={this.props.sessionId} timerString={this.state.timerString}/>}

            {this.state.timerString === '0:00' 
              ? <Modal fadeType="opacity-1 fadeIn" headerText="Vote: Add Time or End Topic" 
                  letEscape={false} bodyProps="break-none" nonfunctionBody={modalBody}/> : null
            }
        </div>
      </div>
    )
  }
}

export default Discussion