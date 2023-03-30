export const setPlayerControls = (controls) =>
{
    return (
        {
            type: 'SET_PLAYER_CONTROLS',
            payload: controls
        }
    )
}

export const setVolumeControls = (volume) =>
{
    return (
        {
            type: 'SET_VOLUME_CONTROL',
            payload: volume
        }
    )
}

export const setAudio = (audio) =>
{
    return(
        {
            type: 'SET_AUDIO',
            payload: audio
        }
    )
}