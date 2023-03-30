const initialState ={
    currentTrack : [],
    track: [],
    url:''
}

const currentTrackReducer = (state =initialState, action) =>
{
    if(action.type === 'SET_CURRENT_TRACK')
    {
        return {
            ...state,
            currentTrack: action.payload
        }
    }
    else if(action.type === 'SET_TRACK')
    {
        return {
            ...state,
            track: action.payload
        }
    }
    else if(action.type === 'SET_TRACK_URL')
    {
        return {
            ...state,
            url: action.payload
        }
    }
    else{
        return state;
    }
}

export default currentTrackReducer;