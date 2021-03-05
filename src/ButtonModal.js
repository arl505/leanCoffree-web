import React from "react";

export default function ButtonModal(props) {

  const [fadeBackground, setFadeBackground] = React.useState(false);
  const [fadeType, setFadeType] = React.useState("opacity-1 fadeIn");

  let handleMouseClick = (event) => {
    if (event.target.id === 'mainParent') {
      closeModal()
    }
  }

  let closeModal = async () => {
    setFadeType("opacity-0 fadeOut")
    await new Promise(resolve => setTimeout(resolve, 450));
    setFadeBackground(false)
  }

  let openModal = () => {
    setFadeType("opacity-1 fadeIn")
    setFadeBackground(true)
  }
  
  return (
    <>
      <button class="p-3 outline hover:bg-gray-900" onClick={openModal}>
        <h3>{props.entryButtonText}</h3>
      </button>
      <br/>
      
      {
        fadeBackground ? <>
          <div className={fadeType + " justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"}
            onClick={handleMouseClick} id="mainParent">
            <div className="relative w-auto my-6 mx-5 max-w-3xl outline">
              
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                
                {/*header*/}
                <div className="flex items-start text-gray-100 justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="font-semibold mr-5">
                    {props.headerText}
                  </h3>
              
                  <button onClick={closeModal}>
                    <span className="text-white font-semibold">×</span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {props.body()}
                </div>
                
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button className="bg-green-500 text-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow mr-1 mb-1"
                    type="button"
                    onClick={closeModal}>{props.submitButtonText}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </> : null
      }
    </>
  );
}