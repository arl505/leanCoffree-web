import React from "react";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button class="p-3 outline hover:bg-gray-900"
        onClick={() => setShowModal(true)}><h3>Create a new Lean Coffree session</h3></button> <br/>
      
      {
        showModal ? <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}>
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                
                {/*header*/}
                <div className="flex items-start text-gray-700 justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="font-semibold">
                    Create Session
                  </h3>
              
                  <button 
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>
                
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-gray-700 text-lg leading-relaxed">
                    Click below to launch a new Lean Coffree session!
                  </p>
                </div>
                
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button className="bg-green-500 text-gray-700 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}>Create Session</button>
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