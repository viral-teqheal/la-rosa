import React, { useRef, useState } from 'react'
import Layout1 from '../../Layouts/Layout1'
import businessman from '../../assets/businessman.jpg'
import axiosInstance from '../../apiInstances/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Advertise = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false)
  const [formDetail, setFormDetail] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    advertiseType: ""
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    axiosInstance
      .post("advertise", {
        fullName: formDetail.fullName,
        email: formDetail.email,
        phoneNumber: formDetail.phoneNumber,
        companyName: formDetail.companyName,
        advertiseType: formDetail.advertiseType
      })
      .then((response) => {
        if (response.data.status) {
          setIsShow(false)
          toast.success(response.data.message)
          setFormDetail({
            fullName: "",
            email: "",
            phoneNumber: "",
            companyName: "",
            advertiseType: ""
          })
        } else {
          setIsShow(false)
          toast.error(response.data.message || response.data.error)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormDetail({ ...formDetail, [name]: value })
  }

  return (
    <Layout1>
      <div className="px-5 pt-3">
        <div className="2xl:px-80 xl:px-60 lg:px-44 mt-16 lg:mt-0">
          <div className="advertise-wrapper flex flex-col md:flex-row justify-center items-center gap-5">
            <div className="advertise-right flex w-full md:w-3/5 lg:w-2/5 flex-col items-start gap-4">
              <h1 className="font-extrabold text-2xl lg:text-4xl xl:text-5xl text-[#262626]">
                Advertise with us
              </h1>
              <p className="font-semibold w-full md:w-4/5 text-lg md:text-xl lg:text-2xl text-[#262626]">
                Get a better result on Nigeria's largest property marketplace
              </p>
              <p className="text-base">Submit an enquiry to our New Business team to get started.</p>
              <button
                className="py-2 px-5 rounded-3xl border bg-[#E5002A] text-white hover:bg-white hover:text-[#E5002A] hover:border-[#E5002A] font-medium"
                onClick={() => { setIsShow(true) }}
              >
                Submit enquiry
              </button>
              <button className="py-2 px-5 rounded-3xl border bg-[#E5002A] text-white hover:bg-white hover:text-[#E5002A] hover:border-[#E5002A] font-medium">
                <a href="https://advertise.myrealestate-ng.com/" target="_blank">
                  Login Advertise
                </a>
              </button>
            </div>
            <div className="advertise-left w-full md:w-3/5 rounded-3xl overflow-auto mt-5 md:mt-0">
              <img src={businessman} alt="about image" className="w-full h-auto rounded-3xl" />
            </div>
          </div>
        </div>
      </div>

      {
        isShow && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
              <div className="relative min-w-[20%] mx-auto  my-10 shadow-black shadow-2xl">
                {/* ------ Content ------ */}
                <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/* ------ Header ------ */}
                  <div className='flex justify-between items-center px-5 pt-3'>
                    <p className='font-semibold xl:text-2xl lg:text-1xl md:text-xl text-lg'>Submit a request</p>
                    <button
                      className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none"
                      onClick={(e) => setIsShow(false)}
                    >
                      ×
                    </button>
                  </div>
                  {/* ------ Body ------ */}
                  <div className="flex justify-around items-center">
                    <div className='p-5'>
                      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <h1 className='font-extrabold xl:text-1xl lg:text-xl text-xl text-[#262626] '>Your Details</h1>
                        <p className='text-sm'>Please provide your details below and our team will be in touch to discuss your MREA options.</p>
                        <div className="w-full">
                          <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                            Full name
                            <span className="px-1 text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            name="fullName"
                            value={formDetail.fullName}
                            onChange={onChangeHandler}
                            placeholder="Enter your full name"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                          />
                        </div>
                        <div className="w-full">
                          <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                            Email
                            <span className="px-1 text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            name="email"
                            value={formDetail.email}
                            onChange={onChangeHandler}
                            placeholder="Enter your email"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                          />
                        </div>
                        <div className="w-full">
                          <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                            Phone Number
                            <span className="px-1 text-red-500">*</span>
                          </div>
                          <input
                            type="number"
                            name="phoneNumber"
                            onChange={onChangeHandler}
                            value={formDetail.phoneNumber}
                            placeholder="Enter your phone number"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                          />
                        </div>
                        <div className="w-full">
                          <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                            Agency/Company Name
                            <span className="px-1 text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            name="companyName"
                            onChange={onChangeHandler}
                            value={formDetail.companyName}
                            placeholder="Enter your companyName"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                          />
                        </div>
                        <div className="w-full">
                          <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                            What content would you primarily like to advertise?
                            <span className="px-1 text-red-500">*</span>
                          </div>
                          <select
                            name="advertiseType"
                            value={formDetail.advertiseType}
                            onChange={onChangeHandler}
                            className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2 md:mt-4"
                          >
                            <option value="">-</option>
                            {/* <option value="top">Top of listing</option>
                            <option value="between">Between listings</option>
                            <option value="vertical">Vertical banners on right hand side of listing</option> */}
                            {/* <option value="banner">google banner in listings</option> */}
                            <option value="Established residential properties (for sale or rent)">Established residential properties (for sale or rent)</option>
                            <option value="New Homes (Building new or off the plan, including retirement living or land)">New Homes (Building new or off the plan, including retirement living or land)</option>
                            <option value="Commercial Properties (for sale or lease)">Commercial Properties (for sale or lease)</option>
                            <option value="Media Advertising">Media Advertising</option>
                          </select>
                        </div>
                        <div className='w-full pt-3'>
                          <button className='w-full py-2 px-5 rounded-3xl border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] font-medium'>Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </Layout1 >
  )
}

export default Advertise