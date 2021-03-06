import React from 'react'
import JoinSessionButtonModal from './JoinSessionButtonModal'
import CreateSessionButtonModal from './CreateSessionButtonModal'

export default function Splash(props) {

  return (
    <div className="bg-gray-800 text-center text-gray-100 min-h-screen min-w-screen">
      <div className="pt-3">
        
        <div className="bg-gray-700 rounded-l-lg ml-5 p-3 text-left sm:pl-10">
          <h1>Lean Coffree, a <b>free</b> Lean Coffee discussion tool</h1>
        </div> 

        {/*todo: replace the below div with a screenshot of app when done*/}
        <div className="bg-red-600 w-85w my-4 h-48w max-h-50h m-auto outline"/>
        
        <CreateSessionButtonModal setAlertText={props.setAlertText} isAlertVisible={props.isAlertVisible} setIsAlertVisible={props.setIsAlertVisible}/>

        <JoinSessionButtonModal setAlertText={props.setAlertText} isAlertVisible={props.isAlertVisible} setIsAlertVisible={props.setIsAlertVisible}/>

      </div>
    </div>
  );
}
