import React from 'react'
import { Grid, Typography, Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

const EngSlider = styled(Slider)({
    color: '#fff',

    // '& .MuiSlider-track': {
    //   border: 'none',
    // },
    // '& .MuiSlider-thumb': {
    //   height: 24,
    //   width: 24,
    //   backgroundColor: '#fff',
    //   border: '2px solid currentColor',
    //   '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
    //     boxShadow: 'inherit',
    //   },
    //   '&:before': {
    //     display: 'none',
    //   },
    // },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 30,
        height: 30,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#c30909',

        transformOrigin: 'center',
        transform: 'translate(0%, 0%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },

        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(-80%, 0%) rotate(225deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(135deg)',
        },
    },
});

const propellerThrustMarks = [
    { value: -100, label: '-100%' },
    { value: -50, label: '-50%' },
    { value: 0, label: '0%' },
    { value: 50, label: '50%' },
    { value: 100, label: '100%' }
]

export default function ControlENG() {
    return (
        <Grid container direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}>
            <Grid item sx={{ height: "200px" }}>
                <EngSlider
                    orientation="vertical"
                    size="small"
                    valueLabelDisplay="on"
                    track={false}
                    max={100}
                    min={-100}
                    marks={propellerThrustMarks}
                   
                    defaultValue={0}
                />
            </Grid>
        </Grid>
    )
}
