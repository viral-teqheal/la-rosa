import { useState } from "react";
import advers from "../../../assets/ad.png"
import note from "../../../assets/note.png"
import shareBlue from "../../../assets/shareBlue.png"
const AdvertiseImageUpload = ({ setIsOpen, IsOpen }) => {

    const handelSerach = () => {
        setIsOpen(false);
    };
    const notedetail = ["Rotates to top result every 30 days", "Hotizonal ad space", "Scroll down with listing", "Montly cost: $20"];
    const [first, setfirst] = useState()
    const [upload, setUpload] = useState({
        heroImg: advers,
        heroImgShow: null,
    })
    const getvalue = () => {
        navigator.clipboard.readText()
            .then(clipboard_value => {
                setfirst(clipboard_value);
            })
    }
    const second = () => {
        var x = document.getElementById("mySelect").value;
        setfirst(x);
    }
    const file = (e) => {
        const { name } = e.target;
        setUpload({
          ...upload ,
          [name]: e.target.files[0],
          [`${name}Show`]: URL.createObjectURL(e.target.files[0]),
        });

    }

    return (
        <>
            {IsOpen === true && (
                <div className="fixed top-0 left-[0%] z-[9999999999999] w-full h-full  backdrop-brightness-50 grid place-items-center place-content-center ">
                    <div className="h-auto sm:max-w-auto w-[700px] filter-screen-model outline-none bg-white rounded-lg shadow-2xl mx-5">
                        {/* ------ details ------ */}
                        <div className="p-7">
                            {/* ----------------  */}

                            {upload?.heroImgShow ? (
            <img
            src={upload?.heroImgShow}
            alt="profile"
            className="border-2 border-dashed border-black rounded-lg"
            />        ) : (
                  <img
                    src={upload?.heroImg}
                    // src={heroImg}
                    alt="logo"
                    className="border-2 border-dashed border-black rounded-2xl"
                  />                )}
                            {/* ------------  */}


                            {/* <img src={advers} alt="icon" /> */}
                            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-2 my-8">
                                {notedetail?.map((e, index) => (
                                    <div key={index} className="flex items-center gap-5">
                                        <img className="lg:w-auto w-10" src={note} alt="img" />
                                        <p className="text-sm text-[#A3A3A3]">{e}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <input
                                    id="heroImg"
                                    type="file"
                                    name="heroImg"
                                    onChange={file}
                                />
                                <label htmlFor="heroImg" className="bg-[#E5002A] px-6 py-3 rounded-3xl text-white mr-5 cursor-pointer">Upload File</label>
                                <span className="text-sm  text-[#A3A3A3]" >Banner size: 200X300px formats alloed: pdf, jpg, mov</span>
                            </div>
                            <div className=" mt-4 md:mt-6">
                                <div className="font-semibold text-[#171717] text-xs md:text-sm lg:text-base">Links</div>
                                <div className="flex flex-col md:flex-row justify-center gap-4">
                                    <div className="flex w-full ring-2 my-5 rounded-3xl ring-[#E5E5E5] ">
                                        <input
                                            type="text"
                                            id="mySelect"
                                            value={first}
                                            onChange={() => second()}
                                            placeholder="Past URL here"
                                            className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none  rounded-[28px] py-1 px-5 "
                                        />
                                        <img onClick={() => getvalue()} className="px-2 py-2" src={shareBlue} alt="img" />
                                    </div>
                                    <div className="w-full">

                                        <input
                                            type="text"
                                            placeholder="Enter Target Location"
                                            className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-5 gap-5">
                                <button  onClick={(e) => setIsOpen(false)}  className="ring-1 ring-slate-400 rounded-3xl px-6 py-3 cursor-pointer">Cancle</button>
                                <button className="bg-[#E5002A] text-white px-6 py-3 rounded-3xl cursor-pointer">Submit</button>
                            </div>
                        </div>



                    </div>
                </div>
            )}
        </>
    );
};

export default AdvertiseImageUpload;



