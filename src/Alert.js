import React from "react";

export default function Alert(props) {


  let closeAlert = () => {
    props.setIsVisible(false)
  }
  
  return (
    <>
    {
      props.isVisible
        ? <>
          <div className="justify-center items-start flex fixed inset-0 z-50 overflow-scroll">
            <div className="my-6">
              
              {/*content*/}
              <div className="rounded-lg bg-white sm:w-30w w-85w">

                {/*body*/}
                <div className="p-4">
                  <p className="text-black text-center">{props.text}</p>
                </div>
                
                {/*footer*/}
                <button onClick={closeAlert} className="w-full border-t py-2 bg-white rounded-b rounded-t hover:bg-gray-100">
                  <div className="text-center text-black font-bold uppercase text-sm">
                    {props.buttonText}
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        : null
    }
    </>
  );
}