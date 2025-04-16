import React from "react";
import closeIcon from "../../../assets/closeIcon.png";


const AlertsPopup = (props) => {

  const handelSerach = () => {
    props.setIsOpen(false);
  };

  const BdrB = "border-b-2 mb-4 py-8"
  const BdrNone = "border-none py-8"

  const borderMatch = props.data.email ? BdrB : BdrNone
  return (
    <>
      {props.IsOpen === true && (
        <div className="fixed top-0 left-[0%] z-[9999999999999] w-full h-full  backdrop-brightness-50 grid place-items-center place-content-center ">
          <div className="h-auto sm:max-w-[470px] filter-screen-model outline-none bg-white rounded-lg shadow-2xl mx-5">
            {/* ------ Header ------ */}
            <div className="p-7">
              <div className="flex justify-between text-xl font-semibold mb-8 border-b-2 border-[#E5E5E5] pb-5 -mx-7">
                <div className="pl-8">{props.data.maintitle}</div>
                <div className="cursor-pointer pr-8">
                  <img
                    src={closeIcon}
                    alt="img"
                    onClick={(e) => props.setIsOpen(false)}
                  />
                </div>
              </div>
              <p className="text-[#525252] text-sm">{props.data.content}</p>
              {
                <div className={`flex px-3 justify-between  ${borderMatch}`}>
                  {props.data.email && <div className="flex items-center gap-4">
                    <img src={props.data.email} alt="img" />
                    <div className="text-[#737373] text-sm">{props.data.name}</div>
                  </div>}
                  {props.data.checkbox && <div className={`${props.data.bordertop}`}>
                    <label className="relative inline-flex items-center cursor-pointer mr-5">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                    </label>
                  </div>}
                </div>
              }
              {props.data.push && <div className="flex border-b-2 gap-3 py-3 mb-3">
                <img src={props.data.push} alt="img" />
                <div className="text-[#737373] text-sm">
                  <div>{props.data.name1}</div>
                  <div>{props.data.con}</div>
                </div>
              </div>}
              {props.data.link && (
                <div className="text-[#737373] text-sm py-2  ">
                  {props.data.link}
                  <span className="text-sky-600"> here</span>
                </div>
              )}
              <div
                onClick={(e) => props.setIsOpen(false)}
                className={`bg-[#D4D4D4] text-center rounded-3xl cursor-pointer py-3 mt-3 hover:bg-[#E5002A] hover:text-white ${props.btnstyle}`}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
};
export default AlertsPopup;
