import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const BetweenAds = ({ detail }) => {
  const handleClick = () => {
    window.open(detail.link, '_blank');
  };
  return (
    <>
      <div className='w-full' onClick={() => handleClick()}>
        <p className='text-left'>ADVERTISEMENT</p>
        <div className="rounded-lg overflow-hidden shadow-lg bg-white">
          <div>
            <div className='p-3 rounded-lg overflow-hidden'>
              <img className="w-full rounded-t-lg cursor-pointer h-[10rem] md:h-[32rem] object-cover" src={detail.advertiseImage} alt="advertise Image" />
              <div className="bg-[#171717] flex justify-end items-center rounded-b-lg p-3 md:p-4 cursor-pointer">
                <div className="flex justify-center items-center text-white text-xs md:text-base rounded-b-lg">
                  <LazyLoadImage
                    src={detail.companyLogoImage}
                    alt=""
                    srcSet={detail.companyLogoImage}
                    loading="lazy"
                    effect="blur"
                    className="h-10 md:w-auto rounded-full aspect-square mr-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <div className="font-bold text-xl mb-2">{detail.title}</div>
              <p className="text-gray-700 text-base">
                {detail.description}
              </p>
            </div>
            <button className="text-xs md:text-sm lg:text-base hover:font-semibold font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-2 px-4 rounded-lg ">
              <a href={detail.link} target='_blank'>Enquiry</a>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BetweenAds