import React from 'react'

export default function TopicCard(props) {

  let styleClasses = props.makeAllWide === true
    ? ["mx-3 outlineThin my-8 overflow-hidden bg-light", "", "bg-lighter"]
    : ["sm:h-56 sm:w-64 outline my-2", 'sm:h-4/5', 'sm:h-1/5'] 

  let overflowScroll = props.disableOverflowScroll === true
    ? ""
    : "sm:overflow-scroll"

  return (
    <div className={styleClasses[0]}>
      <div className={overflowScroll + ' ' +  styleClasses[1] + " p-2 text-left"}>
        {props.topicBody}
      </div>

      <div className={styleClasses[2] + " border-t border-solid border-gray-300 p-1"}>
        {props.topicFooter}
      </div>
    </div>
  )
}