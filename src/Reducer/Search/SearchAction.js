export const setSearchInput = (search) =>
{
    return {
        type: 'SET_SEARCH_INPUT',
        payload: search
    }
}

export const setSearchType = (type) =>
{
    return {
        type : 'SET_SEARCH_TYPE',
        payload: type
    }
}

export const setSearchTrack =(track) =>
{
    return {
        type: 'SET_SEARCH_TRACK',
        payload: track
    }
}

export const setSearchAlbum = (album) =>
{
    return {
        type: 'SET_SEARCH_ALBUM',
        payload: album
    }
}

export const setSearchArtist =(artist)=>
{
    return {
        type: 'SET_SEARCH_ARTIST',
        payload: artist
    }
}