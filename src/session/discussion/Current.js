import React from 'react'
import Axios from 'axios'

class Current extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      timerString: "3:00"
    }
    this.confirmLoadNextTopic = this.confirmLoadNextTopic.bind(this)
    this.loadNextTopic = this.loadNextTopic.bind(this)
    this.confirmEndSession = this.confirmEndSession.bind(this)
    this.endSession = this.endSession.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.currentDiscussionItem !== undefined && this.props.currentDiscussionItem.endTime !== undefined) {
        const timestamp = Date.parse(this.props.currentDiscussionItem.endTime)
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

  confirmLoadNextTopic() {
    this.props.setAlertText("End current topic?")
    this.props.setConfirmationCallback(() => () => this.loadNextTopic());
    this.props.setIsAlertVisible(true)
  }

  loadNextTopic() {
    let nextTopic = this.props.discussionBacklogTopics === undefined || this.props.discussionBacklogTopics.length < 1
      ? undefined
      : this.props.discussionBacklogTopics[0]
    
    let body = nextTopic !== undefined
      ? {command: "NEXT", sessionId: this.props.sessionId, currentTopicText: this.props.topic.text, nextTopicText: nextTopic.text, currentTopicAuthorDisplayName: this.props.topic.authorDisplayName, nextTopicAuthorDisplayName: nextTopic.authorDisplayName}
      : {command: "FINISH", sessionId: this.props.sessionId, currentTopicText: this.props.topic.text, currentTopicAuthorDisplayName: this.props.topic.authorDisplayName};
    
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/refresh-topics", body)
  }

  confirmEndSession() {
    this.props.setAlertText("Are you sure you'd like to end the session?")
    this.props.setConfirmationCallback(() => () => this.endSession());
    this.props.setIsAlertVisible(true)
  }

  endSession() {
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/end-session/' + this.props.sessionId, {})
      .then((response) => {
        if(response.data.status !== "SUCCESS") {
          this.props.setAlertText("Invalid submission, please fix and retry")
          this.props.setIsAlertVisible(true)        
        } else {
          return window.location = process.env.REACT_APP_FRONTEND_BASEURL;
        }
      })
      .catch((error) => {
        this.props.setAlertText("An error occurred, please try again")
        this.props.setIsAlertVisible(true)
      });
  }

  render() {
    let endTopicButton = this.props.isModerator === true && (this.props.topic !== undefined && this.props.topic.text !== undefined)
      ? <button onClick={this.confirmLoadNextTopic} className="hover:bg-gray-900 focus:bg-black outline ml-1 p-1 text-sm">End Topic</button>
      : <button onClick={this.confirmLoadNextTopic} className="invisible hover:bg-gray-900 focus:bg-black outline ml-1 p-1 text-sm">End Topic</button>

    let endSessionButton = this.props.isModerator === true 
      ? <button onClick={this.confirmEndSession} className="hover:bg-gray-900 focus:bg-black outline mr-1 p-1 text-sm">End Session</button>
      : <button onClick={this.confirmEndSession} className="invisible hover:bg-gray-900 focus:bg-black outline mr-1 p-1 text-sm">End Session</button>

    let mainText = this.props.topic === undefined || this.props.topic.text === undefined 
      ? "All conversation topics completed!"
      : this.props.topic.text

    return (
      <>
        { 
          this.props.topic !== undefined && this.props.topic.text !== undefined ? 
          (
            <div className="h-full flex flex-col">
              <div className="mt-2">
                <h2>Current Discussion Topic</h2>
              </div>
              
              <div className="overflow-scroll px-5 mt-2">
                <h1>{mainText}</h1>
              </div>

              <div className="flex flex-grow flex-col justify-end mt-3">
                <div className="flex flex-row justify-between">
                  {endTopicButton}
                  <h2>{this.state.timerString}</h2>
                  {endSessionButton}
                </div>
              </div>
            </div> 
          ) : <h2>All conversation topics completed!</h2>
        }
      </>
    )
  }
}

export default Current