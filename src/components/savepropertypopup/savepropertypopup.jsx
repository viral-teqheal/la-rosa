import React, { useEffect, useRef, useState } from "react";
import Layout2 from "../../Layouts/Layout2";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import icon from "../.././assets/icon.svg";
import icon1 from "../.././assets/icon1.svg";
import icon2 from "../.././assets/icon2.svg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

const Savepropertypopup = ({ onClose, allpropertyid }) => {
  const modalRef = useRef(null);
  let location = useLocation();
  let path = location.pathname.substring(1);

  axiosInstanceAuth
    .post(`/SearchShow`)
    .then((res) => {
      // //console.log(res.data.data);
    })
    .catch((err) => {
      //console.log(err);
    });

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required("Please provide a name"),
  });

  const savesearch = async (searchData) => {
    const data = { name: searchData?.name };
    await axiosInstanceAuth
      .post(`SaveSearch?id=${JSON.stringify(allpropertyid)}`, data)
      .then((res) => {
        const mydata = res?.data?.data;
      })
      .catch((err) => {
        //console.log(err);
      })
      .finally(() => {
        onClose();
      });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [
    
  ]);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values) => {
          savesearch(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
              <div className="relative min-w-[350px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
                <div ref={modalRef} className="bg-white rounded-lg  p-5">
                  <div>
                    <h1 className="text-xl font-semibold text-center pb-5 pt-2">
                      Save your search
                    </h1>
                    <hr className="-mx-5 pb-4" />
                    <div>Name</div>
                    <Field
                      name="name"
                      className="w-full border-2 outline-none border-[#959199] rounded-md py-3 px-5 mb-1"
                    />
                    {touched.name && errors.name && (
                      <div className="text-[red]">{errors.name}*</div>
                    )}
                  </div>
                  <div className=" text-[#767c81] py-3">
                    {" "}
                    {path} | Any Price
                  </div>
                  <div className="flex gap-3">
                    <img src={icon} alt="" className="w-7" /> -
                    <img src={icon1} alt="" className="w-7" /> -
                    <img src={icon2} alt="" className="w-7" />
                  </div>
                  <div className="pt-5 flex items-center">
                    <input
                      type="checkbox"
                      className="items-center mr-1 pt-5"
                      style={{ zoom: "1.8" }}
                    />
                    <span>Notify me of new properties</span>
                  </div>
                  <hr className="-mx-5 my-5" />
                  <div className="flex justify-between">
                    <div className="flex gap-5 ">
                      <button
                        onClick={onClose}
                        className="w-[10em] py-3 border-2 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button

                        className="w-[10em] bg-[#e4002b] rounded-lg text-white py-3"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Savepropertypopup;
