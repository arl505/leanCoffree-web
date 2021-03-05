import React from 'react'
import ButtonModal from './ButtonModal'

export default function Splash() {

  let joinSessionModalBody = () => {
    return (
      <>
        <p className="my-4 text-gray-100 text-lg leading-relaxed">Enter session link below</p>
        <input className="sm:w-96" type="text" placeholder="https://leancoffree.com/session/67caf957-d01a-4bf2-85db-a4d4bb0fb80e"/>
      </>
    )
  }

  let createSessionModalBody = () => {
    return <p className="my-4 text-gray-100 text-lg leading-relaxed">Click below to launch a new Lean Coffree session!</p>
  }

  return (
    <div class="bg-gray-800 text-center text-gray-100 min-h-screen min-w-screen">
      <div class="pt-3">
        <div class="bg-gray-700 rounded-l-lg ml-5 p-3 text-left sm:pl-10">
          <h1>Lean Coffree, a <b>free</b> Lean Coffee discussion tool</h1>
        </div> 

        <br/>

        {/*todo: replace the below div with a screenshot of app when done*/}
        <div class="bg-red-600 w-85w h-48w max-h-50h m-auto outline"/>

        <br/>

        <ButtonModal headerText="Create a Lean Coffree Session" submitButtonText="Create Session"
          entryButtonText="Create a new Lean Coffree session"
          body={createSessionModalBody}/>
        
        <br/>

        <ButtonModal headerText="Join a Lean Coffree Session" submitButtonText="Join Session"
          entryButtonText="Join Lean Coffree session"
          body={joinSessionModalBody}/>
      </div>
    </div>
  );
}
