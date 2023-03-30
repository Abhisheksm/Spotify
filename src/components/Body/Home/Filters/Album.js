import React from 'react'
import { useSelector } from 'react-redux'
import './Album.css'
const Album = () => {
  const search = useSelector(state => state.search)
  return (
    <>
    {
      search.album.data && (
        <div className='content-body'>
          <div className='album-container-search'>
           {
             search.album.data && search.album.data.albums.items.map((data) =>
              {
                return(
                  <div key={data.id}>
                    <div className='playlist'>
                      <div className='image'> 
                       <img src={data.images[0].url}/>
                      </div>
                      <div className='details'>
                        <p className='title'>{data.name}</p>
                        <p className='description'>{data.artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                )
              })
           }
          </div>
        </div>
      )
    }
    </>
  )
}

export default Album
