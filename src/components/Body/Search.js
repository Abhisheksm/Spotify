import React from 'react'
import { useSelector } from 'react-redux'
import SearchInput from './SearchInput'
import Track from './Home/Filters/Track'
import Artist from './Home/Filters/Artist'
import Album from './Home/Filters/Album'
import './Search.css'
const Search = () => {
  const search = useSelector(state => state.search)
  
  return (
    <div className='search-body-container'>
      <SearchInput />
      {search.type === 'track' ? <Track /> : (search.type === 'artist' ? <Artist /> : <Album />)}
    </div>
  )
}

export default Search
