export const setplaylistDetails =(details) =>
{
    return ({
        type: 'SET_PLAYLIST_DETAILS',
        payload: details
    })
}

export const setplaylistID = (id)=>
{
    return ({
        type: 'SET_PLAYLIST_ID',
        payload: id
    })
}