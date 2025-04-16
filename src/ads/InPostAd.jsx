import React, { useEffect } from 'react'

const InPostAd = () => {

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle push error: ", e);
    }
  }, []);

  return (
    <div className='flex rounded-md ads-class h-52'>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1510229541348683"
        data-ad-slot="5720553048"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}

export default InPostAd