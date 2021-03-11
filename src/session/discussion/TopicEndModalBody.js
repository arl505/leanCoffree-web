import React from 'react'
import Axios from 'axios'

export default function TopicEndModalBody(props) {

  const [moreTimeValue, setMoreTimeValue] = React.useState("1m")

  let castVote = (voteType) => {
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + "/discussion-vote", {voteType: voteType, sessionId: props.sessionId, userDisplayName: props.username})
  }

  let addTime = () => {
    let increment = moreTimeValue.toUpperCase();
    let suffix = increment[increment.length - 1]
    increment = increment.slice(0, increment.length - 1);
    increment = suffix + increment;
    Axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/add-time', {increment: increment, sessionId: props.sessionId})
  }

  let moderatorFinalSay = () => {
    return (
      <div className="border-t mt-3 border-dashed">
        <p className="mt-2">Moderator Final Say</p>
        <div className="mt-2 flex justify-between">
          <div>
            <select className="bg-transparent mr-1" value={moreTimeValue} onChange={(event) => setMoreTimeValue(event.target.value)}>
              <option value="30s">30s</option>
              <option selected="selected" value="1m">1m</option>
              <option value="3m">3m</option>
              <option value="5m">5m</option>
              <option value="10m">10m</option>
              <option value="15m">15m</option>
              <option value="30m">30m</option>
              <option value="1h">1h</option>
            </select>
            <button onClick={addTime} type="button" className="bg-green-500 text-white-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-600 focus:bg-green-700">
              Add {moreTimeValue}
            </button>
          </div>
          <button onClick={props.loadNextTopic} type="button" className="bg-blue-500 text-white-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-blue-600 focus:bg-blue-700">
            End Topic
          </button>
        </div>
      </div>
    )
  }

  let endCount = props.discussionVotes.finishTopicVotesCount !== undefined 
    ? props.discussionVotes.finishTopicVotesCount
    : 0

  let addCount = props.discussionVotes.moreTimeVotesCount !== undefined 
    ? props.discussionVotes.moreTimeVotesCount
    : 0

  return (
    <div>
      <div className="my-2 flex justify-between">
        <span className="mr-20">Add Time Votes: {addCount}</span>
        <button onClick={() => castVote('MORE_TIME')} type="button" className="bg-green-500 text-white-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-600 focus:bg-green-700">
          Add Time
        </button>
      </div>
      <div className="my-2 flex justify-between">
        <span>End Topic Votes: {endCount}</span>
        <button onClick={() => castVote('FINISH_TOPIC')} type="button" className="bg-blue-500 text-white-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-blue-600 focus:bg-blue-700">
          End Topic
        </button>
      </div>

      {props.isModerator === true
        ? moderatorFinalSay()
        : null}
    </div>
  )
}