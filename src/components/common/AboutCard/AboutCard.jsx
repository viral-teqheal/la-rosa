import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AboutCard = ({ AgentsInfo }) => {
  const navigate = useNavigate();

  const [TeamDataa, setTeamDataa] = useState([]);

  useEffect(() => {
    const newArray =
      AgentsInfo?.length > 0 &&
      AgentsInfo?.map((obj, i) => ({
        ...obj,
        _id: obj?._id,
        job_title: obj?.job_title,
        first_name: obj?.first_name,
        last_name: obj?.last_name,
        profileImg: obj?.profileImg,
        Review: `5.0 (${i + 35} review)`,
      }));

    setTeamDataa(newArray);
  }, [AgentsInfo]);

  return (
    <div className="flex flex-col justify-start items-start bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
      <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl">
        About the team
      </div>
      <div className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2">
        Showing {TeamDataa?.length} of {TeamDataa?.length} team members from Ray
        White Coomera - COOMERA
      </div>

      <div className="h-full w-full grid place-items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 md:mt-6">
        {TeamDataa?.length > 0 &&
          TeamDataa?.map((i, index) => (
            <div
              key={index}
              className="h-full w-full flex flex-col justify-start items-center gap-1 bg-[#FFFFFF] rounded-lg shadow-md hover:shadow-lg cursor-pointer p-4"
              onClick={() => navigate(`/agent-profile/${i?._id}`)}
            >
              <img
                src={i?.profileImg}
                alt="icon"
                className="md:w-24 aspect-square rounded-full"
              />
              {(i?.first_name || i?.last_name) && (
                <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg mt-2">
                  {i?.first_name} {i?.last_name}
                </div>
              )}

              {i?.Position && (
                <div className="text-[#737373] text-center font-semibold text-xs md:text-sm">
                  {i?.job_title}
                </div>
              )}

              {i?.Review && (
                <>
                  <div className="flex justify-center items-center mt-4">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 hover:text-gray-300 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>First star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 hover:text-gray-300 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Second star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 hover:text-gray-300 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Third star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 hover:text-gray-300 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fourth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 hover:text-gray-300 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fifth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <div className="text-[#A3A3A3] text-center font-medium text-xs">
                    {i?.Review}
                  </div>
                </>
              )}
            </div>
          ))}
      </div>

      <div className="w-full grid place-items-center mt-5 md:mt-8">
        <button className="w-full sm:w-[60%] flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] hover:text-[#E5002A] hover:bg-[#FFFFFF] hover:font-semibold py-3 px-5 rounded-3xl">
          Show more
        </button>
      </div>
    </div>
  );
};

export default AboutCard;
