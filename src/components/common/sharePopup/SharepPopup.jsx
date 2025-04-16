import React, { useEffect, useState } from 'react'
import copyLink from '../../../assets/copyLink.png'
import "./sharePopup.css"
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";

const SharePopup = ({ SetSharePopUp }) => {
  const shareUrl = window.location.href
  const [show, setShow] = useState(false)
  const copyText = () => {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = shareUrl;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
        <div className="relative min-w-[20%] mx-auto  my-10 shadow-black shadow-2xl">
          {/* ------ Content ------ */}
          <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* ------ Header ------ */}
            <div className='flex justify-between items-center m-3'>
              <p>Social share</p>
              <button
                className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none"
                onClick={(e) => SetSharePopUp(false)}
              >
                ×
              </button>
            </div>
            {/* ------ Body ------ */}
            <div className="flex justify-around items-center px-1 py-2">
              <div className='w-[58px] cursor-pointer' onClick={() => copyText()}>
                <img src={copyLink} alt="link" />
                <span id="custom-tooltip" className={`${show ? "block" : "hidden"}`}>copied!</span>
              </div>
              <textarea className='visuallyhidden' id="box"></textarea>


              {/* <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                <FacebookIcon size={50} round={true} />
              </a> */}

              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${shareUrl}`)}`} target="_blank" rel="noopener noreferrer">
                <FacebookIcon size={50} round={true} />
              </a>
              <a href='#'
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`, '_blank');
                }}>
                <WhatsappIcon size={50} round={true} />
              </a>

              <a href={`https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                <XIcon size={50} round={true} />
              </a>

              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={50} round={true} />
              </a>

              {/* <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={50} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={50} round={true} />
              </WhatsappShareButton>
              <TwitterShareButton url={shareUrl}>
                <XIcon size={50} round={true} />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={50} round={true} />
              </LinkedinShareButton> */}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>

    </>
  )
}

export default SharePopup