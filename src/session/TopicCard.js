import React from 'react'

export default function TopicCard(props) {

  let styleClasses = props.makeAllWide === true
    ? ["mx-3 outlineThin overflow-hidden bg-light", "max-h-40h overflow-scroll", "bg-lighter"]
    : props.isLast === true
      ? ["sm:h-56 sm:w-64 outline mt-2", 'sm:h-4/5', 'sm:h-1/5']
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