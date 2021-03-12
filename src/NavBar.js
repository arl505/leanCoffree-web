import React from 'react'
import usersImage from './assets/usersImg.png'
import whiteCrown from './assets/whiteCrown.png'
import blueCrown from './assets/blueCrown.png'
import Modal from './Modal'
import ShareableLinkModal from './session/ShareableLinkModal'

export default function NavBar(props) {

  const [isUsersModalOpen, setIsUsersModalOpen] = React.useState("opacity-0 fadeOut");
  const [isShareableLinkOpen, setIsShareableLinkOpen] = React.useState("opacity-0 fadeOut");

  let goHome = () => {
    window.location.href = process.env.REACT_APP_FRONTEND_BASEURL
  }

  let homeButton = <button className="hover:text-gray-300 focus:text-gray-400" onClick={goHome}>Lean Coffree</button>

  let headingButtonText = props.shortText === true 
    ? homeButton
    : <div>{homeButton}, a <b>free</b> Lean Coffee discussion tool</div>

  let displayUsers = () => {
    setIsUsersModalOpen("opacity-1 fadeIn")
  }

  let nextSectionButtonVisiblity = props.showNextSectionButton === true
    ? "hidden sm:inline-block outline p-1"
    : "hidden";

  let usersButtonVisibility = props.showUserButton === true
    ? "imgTint"
    : "w-0";

  let usersModalBody = () => {
    if(props.users !== undefined) {
      let allHereListItems = [];
      
      for(let i = 0; props.users.displayNames !== undefined && i < props.users.displayNames.length; i++) {
        let username = props.users.displayNames[i];
        let userColor = username === props.userDisplayName
          ? "text-blue-300"
          : "text-white"

        allHereListItems.push(
          <div key={i.toString()} className="flex justify-between items-center">
            <div className={userColor}>
              {props.users.moderator.includes(username) === true && username === props.userDisplayName
                ? <img className="h-4" src={blueCrown} alt="blue crown icon, blue indicating you, crown indicating moderator"/>
                : props.users.moderator.includes(username)
                  ? <img className="h-4" src={whiteCrown} alt="white crown icon indicating moderator"/>
                  : <p className="pl-1">•</p>}
            </div>
            <div className={userColor}>
              {username}
            </div>
          </div>
        );
      }

      return (
        <div>
          <div>
            {allHereListItems}
          </div>
          <div>
            <button type="button" className="outline p-2 mt-2 hover:bg-gray-900 focus:bg-black" onClick={() => setIsShareableLinkOpen("opacity-1 fadeIn")}>Get Shareable Link</button>
          </div>
        </div>
      )
    }
  }
  
  return (
    <div className="bg-gray-700 rounded-l-lg ml-5 p-3 flex justify-between items-center sm:pl-10 sm:pr-20">
      <h1>{headingButtonText}</h1>

      <button disabled={!props.showUserButton} className={usersButtonVisibility} onClick={displayUsers}>
        <img className="h-10" src={usersImage} alt="user list button icon, silhouette of 3 people"/>
      </button>

      <button onClick={props.confirmTransitionToNextSection} className={nextSectionButtonVisiblity + " hover:text-gray-300 focus:text-gray-400"}>Next Section</button>

      <Modal fadeType={isUsersModalOpen} setFadeType={setIsUsersModalOpen} headerText="Attending Users" 
          body={usersModalBody} letEscape={true} bodyProps="break-none" submitButtonText="Close"
          modalCloseCallback={()=>{setIsUsersModalOpen("opacity-0 fadeOut")}}/>

      <ShareableLinkModal sessionId={props.sessionId} isShareableLinkOpen={isShareableLinkOpen} setIsShareableLinkOpen={setIsShareableLinkOpen}/>
    </div>
  )
}