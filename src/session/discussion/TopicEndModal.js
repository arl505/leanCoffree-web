import React from 'react';
import Modal from '../../Modal'

export default function TopicEndModal(props) {

  let createModalBody = () => {

    return <p>Idk yet!</p>
  }

  return (
    <>
    {props.timerString === '0:00' 
      ? <Modal fadeType="opacity-1 fadeIn" headerText="Vote: Add Time or End Topic" body={createModalBody} 
          letEscape={false} bodyProps="break-none"/> : null
    }
    </>
  )
}