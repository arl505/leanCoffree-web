import React from "react";

export default function Alert(props) {

  let closeAlert = (confirmed) => {
    props.setIsVisible(false)
    if (props.confirmationCallback !== undefined && confirmed === true) {
      props.confirmationCallback()
    }
    props.wipeCallback()
  }

  let footer = props.confirmationCallback !== undefined
    ? (
        <div className="w-full h-full border-t bg-white rounded-b rounded-t">
          <button onClick={() => closeAlert(false)} className="w-1/2 h-full border-r">
            <div className="w-full h-full py-2 text-center text-black font-bold uppercase text-sm hover:bg-gray-100 rounded-b">              
              Cancel
            </div>
          </button>

          <button onClick={() => closeAlert(true)} className="w-1/2 h-full">
            <div className="w-full h-full py-2 text-center text-black font-bold uppercase text-sm hover:bg-gray-100 rounded-b">              
              Confirm
            </div>
          </button>
        </div>
      )
    : <button onClick={() => closeAlert(true)} className="w-full border-t py-2 bg-white rounded-b rounded-t hover:bg-gray-100">
        <div className="text-center text-black font-bold uppercase text-sm">
          Okay
        </div>
      </button>
  
  return (
    <>
    {
      props.isVisible
        ? <>
          <div className="justify-center items-center flex fixed inset-0 z-30 overflow-scroll">
            <div>
              
              {/*content*/}
              <div className="rounded-lg bg-white sm:w-30w w-85w">

                {/*body*/}
                <div className="p-4">
                  <p className="text-black text-center">{props.text}</p>
                </div>
                
                {/*footer*/}
                {footer}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-20 bg-black"></div>
          </>
        : null
    }
    </>
  );
}