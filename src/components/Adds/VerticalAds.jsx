import React from 'react'
import logo from '../../assets/logo-new.png'

const VerticalAds = ({ adsList }) => {
  const handleClick = (link) => {
    window.open(link, '_blank');
  };
  return (
    <>
      <div className="grid place-items-center mx-auto mt-3 w-full sm:w-[100%]">
        <div className="max-w-lg w-full grid place-items-center bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer">
          <div className="h-[450px] sm:h-[800px] w-full" onClick={() => handleClick(adsList.link)}>
            <div className="h-[250px] sm:h-[550px]">
              <img src={adsList.advertiseImage} alt="advertiseImage" className="object-cover h-full w-full" />
            </div>
            <div className="h-[150px] sm:h-[200px] bg-white p-3 sm:p-5 overflow-hidden">
              <p className="text-base sm:text-lg text-slate-500">{adsList.title}</p>
              <p className="text-lg sm:text-2xl">
                {adsList.description.length > 99 ? adsList.description.slice(0, 100) + "..." : adsList.description}
              </p>
              <p className="text-sm sm:text-md text-blue-600">{`Read more >`}</p>
            </div>
            <div className="h-[40px] sm:h-[50px] flex justify-end items-center">
              <div className="pr-2 sm:pr-4">
                <img src={logo} alt="logo" className="w-[150px] sm:w-[200px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default VerticalAds