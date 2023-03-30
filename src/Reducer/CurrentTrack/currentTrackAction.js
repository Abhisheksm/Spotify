export const setCurrentTrack = (currentTrack)=>
{
    return (
        {
            type: 'SET_CURRENT_TRACK',
            payload: currentTrack
        }
    )
}

export const setTrack = (track) =>
{
    return (
        {
            type: 'SET_TRACK',
            payload: track
        }
    )
}

export const setTrackURL = (url) =>
{
    return (
        {
            type: 'SET_TRACK_URL',
            payload: url
        }
    )
}

