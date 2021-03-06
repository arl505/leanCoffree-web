import React from "react";

export default function Modal(props) {

  let handleMouseClick = (event) => {
    if (props.letEscape === true && event.target.id === 'mainParent' && (props.isAlertVisible === undefined || props.isAlertVisible === false)) {
      closeModal()
    }
  }

  let closeModal = () => {
    props.setFadeType("opacity-0 fadeOut")
    if(props.setInput !== undefined) {
      props.setInput("")
    }
  }

  let submit = (e) => {
    e.preventDefault()
    props.modalCloseCallback()
  }

  let exitButton = props.letEscape === true 
    ? <button onClick={closeModal}>
        <span className="text-white font-semibold">X</span>
      </button>
    : null;
  
  return (
    <>
    {
      props.fadeType === "opacity-1 fadeIn"
        ? <>
          <div className={props.fadeType + " justify-center items-center flex overflow-x-hidden z-10 overflow-y-auto fixed inset-0 outline-none focus:outline-none"}
            onClick={handleMouseClick} id="mainParent">
            <div className="relative w-auto my-6 mx-5 max-w-3xl outline">
              
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                
                {/*header*/}
                <div className="flex items-start text-white justify-between p-3 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="font-semibold mr-5">
                    {props.headerText}
                  </h3>
                  {exitButton}
                </div>

                <form onSubmit={submit}>
                  {/*body*/}
                  <div className={"relative p-3 flex-auto " + props.bodyProps}>
                    {props.body()}
                  </div>
                  
                  {/*footer*/}
                  <div className="flex items-center justify-end p-3 border-t border-solid border-gray-300 rounded-b">
                    <button className="bg-green-500 text-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow">{props.submitButtonText}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 bg-black"></div>
          </>
        : null
    }
    </>
  );
}