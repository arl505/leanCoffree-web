import React from 'react'

export default function Discussion(props) {

  const [activeTab, setActiveTab] = React.useState("CURRENT")
  const [timerString, setTimerString] = React.useState("")

  React.useEffect(() => timer())

  let timer = () => {
    setInterval(() => {
      if (props.topics.currentDiscussionItem !== undefined && props.topics.currentDiscussionItem.endTime !== undefined) {
        const timestamp = Date.parse(props.topics.currentDiscussionItem.endTime)
        let secondsLeft = Math.max(0, Math.round((timestamp - Date.now()) / 1000))
        let result = getTimerStringFromSecondsLeft(secondsLeft)
        if (timerString !== result) {
          setTimerString(result)
        }
      }
    }, 500);
  }

  let getTimerStringFromSecondsLeft = (secondsLeft) => {
    let min = Math.floor(secondsLeft / 60)
    let seconds = Math.floor(secondsLeft % 60)
    let sec = seconds.toString()
    if (sec.length < 2) {
      sec = '0' + sec
    }
    return min + ':' + sec;
  }

  let queueButtonStyle = activeTab === "QUEUE"
    ? "shadow-custom"
    : ""

  let currentButtonStyle = activeTab === "CURRENT"
    ? "shadow-custom"
    : ""

  let pastButtonStyle = activeTab === "PAST"
    ? "shadow-custom"
    : ""

  let current = () => {
    if (props.topics.currentDiscussionItem !== undefined && props.topics.currentDiscussionItem.text !== undefined) {
      return (
        <div className="h-full flex flex-col">
          <div className="mt-2">
            <h2>Current Discussion Topic</h2>
          </div>
          

          <div className="overflow-scroll px-5 mt-2">
            <h1>{props.topics.currentDiscussionItem.text}</h1>
          </div>

          <div className="flex flex-grow flex-col justify-end mt-3">
            <h2>{timerString}</h2>
          </div>
        </div>
      )
    } else {
      return <h2>All conversation topics completed!</h2>
    }
  }

  let activeTabElement = () => {
    return activeTab === "QUEUE"
      ? "QUEUE"
      : activeTab === "PAST"
          ? "PAST"
          : current()
  }
  
  return (
    <div className="pb-2">
      <div>
        <button onClick={() => setActiveTab("QUEUE")} className={queueButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr"}>QUEUE</button>
        <button onClick={() => setActiveTab("CURRENT")} className={currentButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr"}>CURRENT</button>
        <button onClick={() => setActiveTab("PAST")} className={pastButtonStyle + " relative mt-2 mx-2 p-1 rounded-tl rounded-tr"}>PAST</button>
      </div>

      <div className="h-70vh sm:h-80vh m-auto w-85w border rounded">
        {activeTabElement()}
      </div>
    </div>
  )
}