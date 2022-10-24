import React from 'react'
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import EngineBackDrop from './ControlBackDrop.jsx';

const EngSlider = styled(Slider)({
    color: '#ffffff00',
    width: "100%",
    padding: 0,

    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 50,
        height: 30,
        borderRadius: '20%',
        border: "solid",
        borderColor: "#707070",
        backgroundColor: '#404040',

        transformOrigin: 'center',
        transform: 'translate(0%, 0%) rotate(0deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(0%, 0%) rotate(0deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(0deg)',
        },
    },
});


function valuetext(value) {
    return `${value}%`;
}


export default function ControlEngPS() {
    return (
        <div style={{ position: "relative", width: "50px", height: "200px" }} >
            <EngineBackDrop />
            <EngSlider
                orientation="vertical"
                size="small"
                valueLabelDisplay="on"
                track={false}
                max={100}
                min={-100}
                defaultValue={0}
                valueLabelFormat={valuetext}
                sx={{ position: "absolute", left: "0" }}
            />
        </div>
    )
}
