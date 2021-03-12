import React from 'react'
import JoinSessionButtonModal from './JoinSessionButtonModal'
import CreateSessionButtonModal from './CreateSessionButtonModal'
import NavBar from '../NavBar'
import screenShot from '../assets/screenShot.png'

export default function Splash(props) {

  return (
    <div className="bg-gray-800 text-center text-gray-100 min-h-screen min-w-screen">
      <div className="pt-3">

        <NavBar shortText={false} showUserButton={false}/>

        <div className="lg:flex mt-5 h-full  justify-evenly items-center">
          <img className="lg:w-60w w-85w m-auto lg:m-0 outline" src={screenShot} alt="screenshot of app"/>

          <div className="my-5 lg:w-30w lg:m-0">
            <h1 className="mb-2">Join or create a lean coffree session, for free!</h1>
            <CreateSessionButtonModal setAlertText={props.setAlertText} isAlertVisible={props.isAlertVisible} setIsAlertVisible={props.setIsAlertVisible}/>
            <JoinSessionButtonModal setAlertText={props.setAlertText} isAlertVisible={props.isAlertVisible} setIsAlertVisible={props.setIsAlertVisible}/>
          </div>
        </div>
      </div>
    </div>
  );
}
