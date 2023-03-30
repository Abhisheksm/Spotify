import React, { useState,useEffect } from 'react'
import {FiVolume2, FiVolumeX} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { setVolumeControls } from '../../../Reducer/PlayerControl/playerControlsAction'
import './VolumeController.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
const VolumeControl = () => {
  const audio = useSelector(state => state.playerControls)
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(audio.volume)
  const [showBar, setShowBar]= useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
        window.removeEventListener('resize', handleResize)
    }
}, [])


 const showVolumeBar = () =>
 {
  setShowBar(true)
 }
 const hideVolumeBar = () =>
 {
  setShowBar(false)
 }

 function preventHorizontalKeyboardNavigation(event) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
  }
}

const changeVolume =(e) =>
{
  setVolume(e.target.value)
  audio.audio.current.volume=e.target.value/100
  dispatch(setVolumeControls(e.target.value))
}

  return (

    <div className='volume-container'>
   { !showBar ? <div className='volume-icons'>
         <FiVolume2  onClick={showVolumeBar} /> 
    </div> :
    <div className='volume-slider'>
    <Box sx={{ height: 80 }} onMouseOut={hideVolumeBar}>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        orientation="vertical"
        defaultValue={audio.volume}
        valueLabelDisplay="auto"
        onKeyDown={preventHorizontalKeyboardNavigation}
        onChange={changeVolume}
      />
    </Box>
    </div>
     } 
   
  </div>
  )
}

export default VolumeControl
