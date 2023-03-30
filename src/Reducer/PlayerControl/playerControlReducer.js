const initialState = {
    isPlaying : false,
    volume : 40,
    audio: {}
}

const playerControlsReducer = (state =initialState, action) =>
{
    switch(action.type)
    {
        case 'SET_PLAYER_CONTROLS' :
            {
                return({
                    ...state,
                    isPlaying: action.payload
                })
            }
        case 'SET_VOLUME_CONTROL' :
            {
                return({
                    ...state,
                    volume: action.payload
                })
            }

        case 'SET_AUDIO' :
            {
                return({
                    ...state,
                    audio: action.payload
                })
            }
        default :
        {
            return state
        }
    }
}

export default playerControlsReducer;