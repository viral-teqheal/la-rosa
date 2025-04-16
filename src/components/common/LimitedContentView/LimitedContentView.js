import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardControlKey } from "react-icons/md";

function LimitedContentView({ content }) {
    const [showFullContent, setShowFullContent] = useState(false);

    return (
        <div>
            {showFullContent ? (
                <div>{content}</div>
            ) : (
                <div>{content?.length > 0 && content.substring(0, 5)}...</div>
            )}
            <div className="text-[#525252] font-medium text-xs md:text-sm lg:text-base mt-3 ">
                This immaculate residence provides a modern open floor
                plan that makes sense whilst still offering the larger
                family multiple living options necessary for everyday
                living.
            </div>
            {content?.length > 5 && (
                <button onClick={() => setShowFullContent(!showFullContent)}>
                    {showFullContent ?
                        <div className='flex justify-start items-center text-[#E5002A] font-medium text-xs md:text-sm lg:text-base cursor-pointer my-4 md:my-8' >
                            Read Less
                            <MdKeyboardArrowDown className='rotate-180  duration-[400ms] ' size={24} />
                        </div>
                        : <div className='flex justify-start items-center text-[#E5002A] font-medium text-xs md:text-sm lg:text-base cursor-pointer my-4 md:my-8' >
                            Read More
                            <MdKeyboardArrowDown className='duration-[400ms] ' size={24} />
                        </div>}
                </button>
            )}
        </div>
    );
}

export default LimitedContentView;
