import React from 'react'
import usersImage from './assets/usersImg.png'
import Modal from './Modal'

export default function NavBar(props) {

  const [isUsersModalOpen, setIsUsersModalOpen] = React.useState("opacity-0 fadeOut");

  let goHome = () => {
    window.location.href = process.env.REACT_APP_FRONTEND_BASEURL
  }

  let homeButton = <button onClick={goHome}>Lean Coffree</button>

  let headingButtonText = props.shortText === true 
    ? homeButton
    : <div>{homeButton}, a <b>free</b> Lean Coffee discussion tool</div>

  let displayUsers = () => {
    setIsUsersModalOpen("opacity-1 fadeIn")
  }

  let usersButton = props.showUserButton === true
    ? <button onClick={displayUsers}><img className="flexedImage w-10" src={usersImage} alt="user list button icon, silhouette of 3 people"/></button>
    : null;

  let usersModalBody = () => {
    if(props.users !== undefined) {
      let allHereListItems = [];
      
      for(let i = 0; i < props.users.displayNames.length; i++) {
        let username = props.users.displayNames[i];
        allHereListItems.push(<li key={i.toString()} class="usernameListItem">{username}</li>);
      }

      return (
        <ul className="text-left list-disc list-inside">{allHereListItems}</ul>
      )
    }
  }
  
  return (
    <div className="bg-gray-700 rounded-l-lg ml-5 p-3 flex justify-between items-center sm:pl-10 sm:pr-20">
      <h1>{headingButtonText}</h1>

      {usersButton}

      <Modal fadeType={isUsersModalOpen} setFadeType={setIsUsersModalOpen} headerText="Attending Users" 
          body={usersModalBody} letEscape={true} bodyProps="break-none" submitButtonText="Close"
          modalCloseCallback={()=>{setIsUsersModalOpen("opacity-0 fadeOut")}}/>
    </div>
  )
}