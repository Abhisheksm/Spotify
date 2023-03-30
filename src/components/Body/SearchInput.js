import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {FaSearch} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchAlbum, setSearchArtist, setSearchTrack, setSearchType } from '../../Reducer/Search/SearchAction'
import './Search.css'
import { Search_placeholder } from '../Constants';

const SearchInput = (props) => {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch();
  const search = useSelector(state => state.search)

  useEffect(()=>
  {
  
    const getData = setTimeout(() =>
    {
      axios.get('https://api.spotify.com/v1/search',
       {
         params: {
          q: searchInput,
          type: search.type,
          limit: 10
         },
         headers : {
          Authorization : "Bearer " + localStorage.getItem('token'),
          "Content-Type" : "application/json"
      }
      })
      .then((response)=> 
      { 
        if(search.type === 'track')
        {
          dispatch(setSearchTrack(response))
          props.handleData(response)
        }
        else if(search.type ==='artist')
        {
          dispatch(setSearchArtist(response))
          props.handleArtist(response)
        }
        else{
          dispatch(setSearchAlbum(response))
          props.handleAlbum(response)
        }
      });
      
    },2000)
    return () => clearTimeout(getData)
  
  },[searchInput, search.type])

  const handleFilter = (type) =>
  {
    setSearchInput('')
    dispatch(setSearchType(type))
  }
  const handleInput = (e)=>
  {
    setSearchInput(e.target.value)
  }
  return (
    <div className='search-container'>
      <div className='search-bar'>
        <FaSearch style={{'color':'antiquewhite'}}/>
        <input 
         type="text"
         placeholder={Search_placeholder}
         value={searchInput}
         onChange={handleInput} />
      </div>
      <div className='search-filter'>
       <ul>
        <li className= {search.type ==="track" ? 'active search-type' : 'search-type'} onClick={() => handleFilter('track')} >Track</li>
        <li className= {search.type ==="artist" ? 'active search-type' : 'search-type'} onClick={() => handleFilter('artist')} >Artist</li>
        <li className= {search.type ==="album" ? 'active search-type' : 'search-type'} onClick={() => handleFilter('album')} >Album</li>
       </ul>
      </div>
    </div>
  )
}

export default SearchInput
