import React from 'react'

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

    let current = () => {
      if (props.topics.currentDiscussionItem !== undefined && props.topics.currentDiscussionItem.text !== undefined) {
        return (
          <div className="h-full flex flex-col">
            <div className="">
              <h2>Current Discussion Topic</h2>
            </div>
            

              <div className="overflow-scroll px-5 flex flex-col mt-5">
                <h3>{props.topics.currentDiscussionItem.text}</h3>
              </div>

            <div className="flex flex-grow flex-col justify-end mt-3">hi</div>
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