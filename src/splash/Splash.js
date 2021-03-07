import React from 'react'
import JoinSessionButtonModal from './JoinSessionButtonModal'
import CreateSessionButtonModal from './CreateSessionButtonModal'
import NavBar from '../NavBar'

export default function Splash(props) {

  return (
    <div className="bg-gray-800 text-center text-gray-100 min-h-screen min-w-screen">
      <div className="pt-3">

        <NavBar shortText={false} showUserButton={false}/>

        {/*todo: replace the below div with a screenshot of app when done*/}
        <div className="bg-red-600 w-85w my-4 h-48w max-h-50h m-auto outline"/>
        
        <CreateSessionButtonModal setAlertText={props.setAlertText} isAlertVisible={props.isAlertVisible} setIsAlertVisible={props.setIsAlertVisible}/>

        <JoinSessionButtonModal setAlertText={props.setAlertText} isAlertVisible={props.isAlertVisible} setIsAlertVisible={props.setIsAlertVisible}/>

      </div>
    </div>
  );
}
