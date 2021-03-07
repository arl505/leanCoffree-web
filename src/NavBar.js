import React from 'react'
import usersImage from './assets/usersImg.png'

export default function NavBar(props) {

  let goHome = () => {
    window.location.href = process.env.REACT_APP_FRONTEND_BASEURL
  }

  let homeButton = <button onClick={goHome}>Lean Coffree</button>

  let headingButtonText = props.shortText === true 
    ? homeButton
    : <div>{homeButton}, a <b>free</b> Lean Coffee discussion tool</div>

  let usersButton = props.showUserButton === true
    ? <img className="flexedImage w-10" src={usersImage} alt="user list button icon, silhouette of 3 people"/>
    : null;
  
  return (
    <div className="bg-gray-700 rounded-l-lg ml-5 p-3 flex justify-between items-center sm:pl-10 sm:pr-20">
      <h1>{headingButtonText}</h1>

      {usersButton}
    </div>
  )
}