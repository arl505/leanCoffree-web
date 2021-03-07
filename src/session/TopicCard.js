import React from 'react'

export default function TopicCard(props) {

  return (
    <div className="sm:h-52 sm:w-64 outline m-2">
      <div className="sm:h-4/5 sm:overflow-scroll p-2 text-left">
        {props.topicText}
      </div>

      <div className="sm:h-1/5 border-t border-solid border-gray-300 p-2">
        {props.topicFooter}
      </div>
    </div>
  )
}