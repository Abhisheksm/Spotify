import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import './Header.css'
import { Good_Morning, Good_Afternoon, Good_Evening } from '../Constants'

const Header = () => {
    const userInfo = useSelector((state)=> state.userInfo)
    let time= new Date();
    let hour= time.getHours();
    let greet= '';
    if(hour < 12)
    {
      greet =Good_Morning
    }
    else if(hour < 18)
    {
      greet = Good_Afternoon
    }
    else {
      greet = Good_Evening
    }

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

    const showSidebar = width > 768

  return (
    <>
    <div className='header'>
        <p className='header-greeting'>{`Hi ${userInfo.name && ((userInfo.name).split(' ')[0])}, ${greet}`}</p>
        {
          (showSidebar ? 
          <div className='header-profile'>
                <img src={userInfo.image} alt='UserImage' />
        </div>
        : "")
        }
        
    </div>
    </>
  )
}

export default Header
