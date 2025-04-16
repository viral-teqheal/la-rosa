import React, { useEffect, useState } from "react";
import google from "../../../assets/google.png"
import microsoft from "../../../assets/microsoft-outlook.png"
import apple from "../../../assets/apple.png"
import other from "../../../assets/other.png"
import closeIcon from "../../../assets/closeIcon.png"




import { useNavigate } from "react-router-dom";

const CalendarScreen = ({ setIsOpen, IsOpen, currentTab }) => {
  const navigate = useNavigate();
  const FilterTab = ["Buy", "Sold", "Rent"];
  const [isActive, setisActive] = useState(currentTab);

  useEffect(() => {
    setisActive(currentTab);
  }, [currentTab]);



  const handelSerach = () => {
    if (isActive === FilterTab[0]) {
      navigate(`/buy`);
    }
    if (isActive === FilterTab[1]) {
      navigate(`/sold`);
    }
    if (isActive === FilterTab[2]) {
      navigate(`/rent`);
    }
    setIsOpen(false);
  };

  return (
    <>
      {IsOpen === true && (
        <div className="fixed top-0 left-[0%] z-[9999999999999] w-full h-full  backdrop-brightness-50 grid place-items-center place-content-center ">
          <div className="h-auto sm:max-w-[470px] filter-screen-model outline-none bg-white rounded-lg shadow-2xl mx-5">
            {/* ------ Header ------ */}
            <div className="p-8">
              <div className="flex justify-between text-xl font-semibold mb-8"><div>Add to calendar </div><div className="cursor-pointer"><img src={closeIcon} alt="img" onClick={(e) => setIsOpen(false)} /></div>

              </div>
              <p className="">Inspection for 51 Beleura Hill Road, Mornington on Saturday 7 January at 12:00am - 12:30am</p>

              <div className="flex items-center gap-4 py-5 cursor-pointer">
                <img src={google} alt="drtgfdfyh" srcset="" />
                <h2 className="font-bold text-lg">Google calendar</h2>
              </div>
              <div className="flex items-center gap-4 cursor-pointer">
                <img src={apple} alt="drtgfdfyh" srcset="" />
                <h2 className="font-bold text-lg">Apple calendar</h2>
              </div>
              <div className="flex items-center gap-4 py-5 cursor-pointer">
                <img src={microsoft} alt="drtgfdfyh" srcset="" />
                <h2 className="font-bold text-lg">Outlook calendar</h2>
              </div>
              <div className="flex items-center gap-4  cursor-pointer">
                <img src={other} alt="drtgfdfyh" srcset="" />
                <h2 className="font-bold text-lg">Other</h2>
              </div>
            </div>


          </div>
        </div>
      )}
    </>
  );
};

export default CalendarScreen;

