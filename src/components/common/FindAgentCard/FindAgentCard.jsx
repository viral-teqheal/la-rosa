import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import verify from "../../../assets/verify.png";
import MoreBlue from "../../../assets/MoreBlue.png";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import Review from "../Review/Review";
import Pagination from "../Pagination/Pagination";
const FindAgentCard = (props) => {
  const { AgentData } = props;
  //console.log("🚀 ~ FindAgentCard ~ AgentData:", AgentData)
  let PageSize = 4;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedReviews, setExpandedReviews] = useState([]);
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentData = AgentData.slice(firstPageIndex, lastPageIndex);
  return (
    <>
      <div
        className={`grid place-items-center grid-cols-1 xl:grid-cols-2 gap-8 ${props.style} `}
      >
        {currentData?.length > 0 &&
          currentData?.map((i, index) => {
            const topHeadColor = i?.TopHeadColor
              ? `bg-[${i?.TopHeadColor}]`
              : "bg-[#FFFFFF]";
            const agentLogoSrc = i?.AgencySmallLogo;
            const agentImageSrc = i?.AgentImage;
            const goldCoastPropsSold = i?.PropertiesSoldAsLeadAgent;
            const medianDaysPrice = i?.MedianDaysPrice;
            const medianDaysAdvertised = i?.MediandaysAdvertised;
            const allSuburbsPropsSold = i?.PropertiesSold;
            const sellerRating = i?.Review[0]?.star;
            const verifiedReview = i?.Review[0];
            const reviewText = i?.Review[0]?.review;
            const reviewId = i?.Review[0]?._id;
            const recentlySoldData = i?.RecentlySold;
            const isExpanded = expandedReviews.includes(reviewId);
            const truncatedText =
              reviewText?.length >= 245
                ? `${reviewText?.substring(0, 245)}...`
                : reviewText;
            const navigateToAppraisal = () => {
              navigate(`/appraisal/${i?.id}`);
            };
            const navigateToAgentProfile = () => {
              navigate(`/agent-profile/${i?.id}`);
            };
            const navigateToAgencyProfile = () => {
              navigate(`/agency-profile/${i?.AgencyId}`);
            };
            const toggleExpanded = (reviewId) => {
              if (expandedReviews.includes(reviewId)) {
                setExpandedReviews(
                  expandedReviews.filter((id) => id !== reviewId)
                );
              } else {
                setExpandedReviews([...expandedReviews, reviewId]);
              }
            };
            return (
              <div
                key={index}
                className="h-full flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg"
              >
                <div className="flex flex-col justify-center items-center">
                  <div
                    className={`w-full grid place-items-center py-2 rounded-t-xl ${topHeadColor}`}
                  >
                    <LazyLoadImage
                      src={agentLogoSrc}
                      alt="icon"
                      srcSet={agentLogoSrc}
                      loading="lazy"
                      effect="blur"
                      className="h-10 rounded-lg cursor-pointer"
                      onClick={navigateToAgencyProfile}
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center p-4 md:p-6">
                    <LazyLoadImage
                      src={agentImageSrc}
                      alt="icon"
                      srcSet={agentImageSrc}
                      onClick={navigateToAgentProfile}
                      loading="lazy"
                      effect="blur"
                      className="w-28 aspect-square rounded-full cursor-pointer"
                    />
                    <div className="text-[#171717] text-center font-semibold text-sm md:text-lg lg:text-xl mt-4">
                      {i?.AgentName}
                    </div>
                    <div className="text-[#737373] text-center font-medium text-xs lg:text-sm mt-1">
                      {i?.AgentAbout}
                    </div>
                    {/* <div className="text-[#737373] text-center font-medium text-xs lg:text-sm mt-1">
                      {i?.AgentExperince}
                    </div> */}
                    <div className="flex justify-center items-center cursor-pointer mt-4">
                      <Review rating={i?.Rating} />
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 my-4 md:my-6">
                      <div className="col-span-3 flex flex-col justify-center items-center bg-[#F5F5F5] rounded-xl p-5">
                        <div className="text-[#737373] text-center font-semibold  text-sm md:text-base lg:text-lg">
                          GOLD COAST
                        </div>
                        <div className="flex justify-center gap-4 md:gap-8 mt-2">
                          <div className="flex flex-col justify-start items-center">
                            <div className="text-[#171717] font-semibold  text-sm md:text-base lg:text-lg">
                              {goldCoastPropsSold}
                            </div>
                            <div className="text-[#525252] text-center text-xs md:text-sm lg:text-base mt-2">
                              Properties sold (as lead agent)
                            </div>
                          </div>
                          <div className="flex flex-col justify-start items-center">
                            <div className="text-[#171717] font-semibold  text-sm md:text-base lg:text-lg">
                              {`${String(medianDaysPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                            </div>
                            <div className="text-[#525252] text-center text-xs md:text-sm lg:text-base mt-2">
                              Median days price
                            </div>
                          </div>
                          <div className="flex flex-col justify-start items-center">
                            <div className="text-[#171717] font-semibold  text-sm md:text-base lg:text-lg">
                              {medianDaysAdvertised}
                            </div>
                            <div className="text-[#525252] text-center text-xs md:text-sm lg:text-base mt-2">
                              Median days advertised
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-3 md:col-span-1 flex flex-col justify-start items-center bg-[#F5F5F5] rounded-xl p-5">
                        <div className="text-[#737373] text-center font-semibold  text-sm md:text-base lg:text-lg">
                          ALL SUBURBS
                        </div>
                        <div className="text-[#171717] font-semibold  text-sm md:text-base lg:text-lg mt-2">
                          {allSuburbsPropsSold}
                        </div>
                        <div className="text-[#525252] text-center text-xs md:text-sm lg:text-base mt-1">
                          Properties sold
                        </div>
                      </div>
                    </div>

                    {verifiedReview && (
                      <div className="w-full flex flex-col justify-start gap-3 bg-[#F5F5F5] rounded-xl p-4 md:p-6">
                        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start gap-2">
                          <div className="flex justify-start items-center">
                            <div className="flex justify-center cursor-pointer mr-2">
                              <Review rating={sellerRating} />
                            </div>
                            <div className="text-[#171717] font-semibold text-xs md:text-sm">
                              Rating from a seller
                            </div>
                          </div>
                          <div className="flex justify-center items-center">
                            <img src={verify} alt="icon" className="w-4 mr-2" />
                            <div className="text-[#737373] font-medium text-xs md:text-sm">
                              Verified review
                            </div>
                          </div>
                        </div>
                        <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                          {isExpanded ? reviewText : truncatedText}
                        </div>
                        {reviewText?.length >= 245 && (
                          <div
                            className="flex justify-start items-center "
                            onClick={() => toggleExpanded(reviewId)}
                          >
                            <div className="text-[#3B8FD4] font-semibold text-xs md:text-sm lg:text-base cursor-pointer">
                              {isExpanded ? "Read less" : "Read more"}
                            </div>
                            <img
                              src={MoreBlue}
                              alt="icon"
                              className={`${isExpanded
                                ? "rotate-180 w-3 ml-2 cursor-pointer"
                                : "w-3 ml-2 cursor-pointer"
                                } transition-all delay-200 duration-200 ease-in-out`}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {recentlySoldData?.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-4 justify-start items-end gap-4 mt-4 md:mt-6">
                        {recentlySoldData.map((d, index) => (
                          <div key={index}>
                            <div className="text-[#404040] font-medium text-[10px] md:text-sm p-1">
                              {d?.frontPageImg ? "RECENTLY SOLD" : ""}
                            </div>
                            <img
                              src={d?.frontPageImg}
                              alt="icon"
                              className="w-40 h-28 aspect-square cursor-pointer"
                              onClick={() =>
                                navigate(`/property-house/${d?._id}`)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full px-4 md:px-6 pb-4 md:pb-6">
                  <button
                    className="w-full text-xs md:text-sm lg:text-base font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl mt-3"
                    onClick={navigateToAppraisal}
                  >
                    Request a free market appraisal
                  </button>

                  {/* <button
                    className="w-full text-xs md:text-sm lg:text-base font-medium border text-[#737373] border-[#737373] py-3 px-5 rounded-3xl mt-3"
                    onClick={navigateToAgentProfile}
                  >
                    Add to compare
                  </button> */}
                </div>
              </div>
            );
          })}
      </div>

      {/* <<----- Paginationp ----->> */}
      <div className="flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          totalCount={AgentData.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default FindAgentCard;
