import React from 'react'

const TopAds = ({ list }) => {
  const handleClick = (link) => {
    window.open(link, '_blank');
  };
  return (
    <>
      {
        list.map((item, index) => {
          return (
            <div key={index} onClick={() => handleClick(item.link)} className="bg-white overflow-hidden w-5/12 border-2 cursor-pointer border-slate-500">
              <div className="flex items-center justify-center">
                {/* Left Image Section */}
                <div className="flex-none w-32">
                  <img
                    src={item.advertiseImage}
                    alt="Advertise"
                    className="w-32 h-24 object-cover"
                  />
                </div>

                {/* Text Section */}
                <div className="flex-1 pl-3">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600 text-sm">{item.description.split(" ").slice(0, 20).join(" ") + (item.description.split(" ").length > 20 ? "..." : "")}</p>
                </div>

                {/* Right Image Section */}
                <div className="flex-none flex items-center">
                  <div className="border-l-2 border-b-slate-700 h-16 mx-4"></div>
                  <div className="flex-none w-full">
                    <img
                      src={item.companyLogoImage}
                      alt="Company Logo"
                      className="w-32 h-24 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default TopAds