import React, { useState } from "react";
import axiosInstance from "../../../apiInstances/axiosInstance";
import { useNavigate } from "react-router-dom";

const Contactus = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`/contact_us`, {
        name: formData?.name,
        email: formData?.email,
        message: formData?.message,
      })
      .then((res) => {
        if (res.status) {
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div>
        <div className="flex flex-wrap justify-center items-center h-[100vh] w-[100%]">
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="relative p-8 bg-white rounded-lg shadow-lg sm:p-12">
              <form onSubmit={handleSubmit}>
                <span className="font-semibold  text-center">Contact Us</span>
                <h2 className="font-bold text-3xl mb-6 mt-4">
                  GET IN TOUCH WITH US
                </h2>

                <div className="">
                  <div className="mb-6">
                    <input
                      id="name"
                      type="text"
                      className="bg-gray-50 border outline-none border-gray-300  text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      placeholder="Name"
                      vvalue={formData.name}
                      onChange={handleChange}
                      required
                    ></input>
                  </div>
                  <div className="mb-6">
                    <input
                      id="email"
                      type="email"
                      className="bg-gray-50 border outline-none border-gray-300  text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      value={formData.email}
                      placeholder="E-mail"
                      onChange={handleChange}
                      required
                    ></input>
                  </div>

                  <div className="mb-6 ">
                    <textarea
                      id="message"
                      className="bg-gray-50 h-[8rem] border outline-none border-gray-300  text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      required
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      className="w-full p-3 text-white bg-[#E5002A] transition border rounded border-primary "
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>

              <span className="absolute -top-10 -right-9 z-[-1]">
                <svg
                  width={100}
                  height={100}
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                    fill="#3056D3"
                  />
                </svg>
              </span>
              <span className="absolute -right-10 top-[90px] z-[-1]">
                <svg
                  width={34}
                  height={134}
                  viewBox="0 0 34 134"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="31.9993"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 31.9993 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 31.9993 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 31.9993 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 31.9993 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 31.9993 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 31.9993 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 31.9993 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 31.9993 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 31.9993 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 31.9993 1.66665)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 17.3333 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 17.3333 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 17.3333 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 17.3333 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 17.3333 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 17.3333 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 17.3333 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 17.3333 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 17.3333 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 17.3333 1.66665)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 2.66536 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 2.66536 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 2.66536 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 2.66536 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 2.66536 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 2.66536 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 2.66536 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 2.66536 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 2.66536 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 2.66536 1.66665)"
                    fill="#13C296"
                  />
                </svg>
              </span>
              <span className="absolute -left-7 -bottom-7 z-[-1]">
                <svg
                  width={107}
                  height={134}
                  viewBox="0 0 107 134"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="104.999"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 104.999 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="104.999"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 104.999 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="104.999"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 104.999 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="104.999"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 104.999 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="104.999"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 104.999 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="104.999"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 104.999 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="104.999"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 104.999 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="104.999"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 104.999 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="104.999"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 104.999 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="104.999"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 104.999 1.66665)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 90.3333 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 90.3333 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 90.3333 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 90.3333 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 90.3333 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 90.3333 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 90.3333 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 90.3333 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 90.3333 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="90.3333"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 90.3333 1.66665)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 75.6654 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 31.9993 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 75.6654 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 31.9993 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 75.6654 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 31.9993 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 75.6654 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 31.9993 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 75.6654 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 31.9993 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 75.6654 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 31.9993 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 75.6654 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 31.9993 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 75.6654 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 31.9993 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 75.6654 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 31.9993 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="75.6654"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 75.6654 1.66665)"
                    fill="#13C296"
                  />
                  <circle
                    cx="31.9993"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 31.9993 1.66665)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 60.9993 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 17.3333 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 60.9993 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 17.3333 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 60.9993 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 17.3333 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 60.9993 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 17.3333 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 60.9993 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 17.3333 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 60.9993 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 17.3333 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 60.9993 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 17.3333 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 60.9993 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 17.3333 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 60.9993 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 17.3333 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="60.9993"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 60.9993 1.66665)"
                    fill="#13C296"
                  />
                  <circle
                    cx="17.3333"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 17.3333 1.66665)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 46.3333 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={132}
                    r="1.66667"
                    transform="rotate(180 2.66536 132)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 46.3333 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="117.333"
                    r="1.66667"
                    transform="rotate(180 2.66536 117.333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 46.3333 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="102.667"
                    r="1.66667"
                    transform="rotate(180 2.66536 102.667)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 46.3333 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={88}
                    r="1.66667"
                    transform="rotate(180 2.66536 88)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 46.3333 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="73.3333"
                    r="1.66667"
                    transform="rotate(180 2.66536 73.3333)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 46.3333 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={45}
                    r="1.66667"
                    transform="rotate(180 2.66536 45)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 46.3333 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={16}
                    r="1.66667"
                    transform="rotate(180 2.66536 16)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 46.3333 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy={59}
                    r="1.66667"
                    transform="rotate(180 2.66536 59)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 46.3333 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="30.6666"
                    r="1.66667"
                    transform="rotate(180 2.66536 30.6666)"
                    fill="#13C296"
                  />
                  <circle
                    cx="46.3333"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 46.3333 1.66665)"
                    fill="#13C296"
                  />
                  <circle
                    cx="2.66536"
                    cy="1.66665"
                    r="1.66667"
                    transform="rotate(180 2.66536 1.66665)"
                    fill="#13C296"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;


