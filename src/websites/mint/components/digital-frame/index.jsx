import React from "react";
import './index.css';
import DigitalMask from "../../assets/images/digital-frame.png";

const DigitalFrame = ({video}) => {
    return (
        <div className="digital-frame">
            <img src={DigitalMask} className='digital-mask'/>
            <img alt="Object-Image" className='object-video' src={video}/>
        </div>
    )
}

export default DigitalFrame;