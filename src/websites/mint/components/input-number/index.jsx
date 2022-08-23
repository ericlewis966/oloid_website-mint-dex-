import React, { useState } from "react";
import * as AwesomeButton from 'react-awesome-button';
import './index.css';
import 'react-awesome-button/dist/themes/theme-blue.css';

const InputNumber = ({ onMinus, onPlus, onMax, value, max }) => {

    // const [value, setValue] = useState(0);

    return (
        <div className="flex row input-number">
            <div className="flex">
                <AwesomeButton.AwesomeButton className="input-minus" onPress={onMinus}>-</AwesomeButton.AwesomeButton>
                <div className="flex input-value">
                    <input type='number' min={1} value={value} onChange={() => { }} max={max} maxLength={max} className='flex input-value awesome-input' />
                </div>
                <AwesomeButton.AwesomeButton className="input-plus" onPress={onPlus}>+</AwesomeButton.AwesomeButton>
            </div>
            <div className="flex">
                <AwesomeButton.AwesomeButton className="set-max" onPress={onMax}>Set Max</AwesomeButton.AwesomeButton>
            </div>
        </div>
    )
}

export default InputNumber;