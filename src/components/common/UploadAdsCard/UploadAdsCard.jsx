import React, { useState } from "react";
import uploadIcon from "../../../assets/select-img.png";
import AdvertiseImageUpload from ".././AdvertiseImageUpload/AdvertiseImageUpload"

const UploadAdsCard = (props) => {
  const [Iscale, setIscal] = useState(false);
  return (
    <div
      className={`grid grid-rows-1 place-items-center border border-dashed border-[#CB0013] bg-[#FFEAEF] rounded-2xl py-40 xl:py-80 cursor-pointer ${props.style}`}
    >
      <div className="flex justify-center items-center gap-2 font-semibold text-sm md:text-lg lg:text-2xl text-[#E5002A]"  onClick={()=>{setIscal(true)}}>
        <img src={uploadIcon} alt="icon" className="w-8 lg:w-12" />
        Upload a file
      </div>
      <div className="font-medium text-xs md:text-base lg:text-lg text-[#E5002A]">
        Advertise
      </div>
      <AdvertiseImageUpload
         setIsOpen={setIscal}
         IsOpen={Iscale}
         currentTab={"Rent"}
      />
    </div>
  );
};

export default UploadAdsCard;
