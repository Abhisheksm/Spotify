import React from 'react'
import { useSelector } from 'react-redux'
import './Artist.css'

const Artist = () => {
    const search = useSelector(state => state.search)
  return (
   <>
   {search.artist && <div className='container-body'>
    <div className='body-container-search'>
        { search.artist.data && search.artist.data.artists.items.map((data) =>
        {
            
            return(
                <div className='artist-details'>
               {data.images[0] &&  <div className='artist-image'>
                <img src={data.images && data.images[0].url}/>
                </div>}
                <div artist-name>
                 <h4 style={{'color':'white'}}>{data.name}</h4>
                </div>
            </div>  
            )       
        })
        }
    
    </div>

   </div>
}
   </>
  )
}

export default Artist

