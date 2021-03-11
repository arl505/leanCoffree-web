import React from 'react'
import Current from './Current'
import Queue from './Queue'
import Past from './Past'
import TopicEndModal from './TopicEndModal'

class Discussion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: "CURRENT",
      timerString: ""
    }
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.topics !== undefined && this.props.topics.currentDiscussionItem !== undefined && this.props.topics.currentDiscussionItem.endTime !== undefined) {
        const timestamp = Date.parse(this.props.topics.currentDiscussionItem.endTime)
        let secondsLeft = Math.max(0, Math.round((timestamp - Date.now()) / 1000))
        let result = this.getTimerStringFromSecondsLeft(secondsLeft)
        this.setState({timerString: result})
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
                    topic={this.props.topics.currentDiscussionItem} isModerator={this.props.isModerator} currentDiscussionItem={this.props.topics.currentDiscussionItem}
                    sessionId={this.props.sessionId} discussionBacklogTopics={this.props.topics.discussionBacklogTopics} timerString={this.state.timerString}/>}

            <TopicEndModal currTopic={this.props.topics.currentDiscussionItem} timerString={this.state.timerString}/>
        </div>
      </div>
    )
  }
}

export default Discussion