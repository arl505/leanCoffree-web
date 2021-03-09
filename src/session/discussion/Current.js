import React from 'react'

export default function Current(props) {

  const [timerString, setTimerString] = React.useState("")

  React.useEffect(() => timer())

  let timer = () => {
    setInterval(() => {
      if (props.topic !== undefined && props.topic.endTime !== undefined) {
        const timestamp = Date.parse(props.topic.endTime)
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

  return (
    <>
      { 
        props.topic !== undefined && props.topic.text !== undefined ? 
        (
          <div className="h-full flex flex-col">
            <div className="mt-2">
              <h2>Current Discussion Topic</h2>
            </div>
            

            <div className="overflow-scroll px-5 mt-2">
              <h1>{props.topic.text}</h1>
            </div>

            <div className="flex flex-grow flex-col justify-end mt-3">
              <h2>{timerString}</h2>
            </div>
          </div> 
        ) : <h2>All conversation topics completed!</h2>
      }
    </>
  )
}