const initialState ={
    details: "",
    id: ""
}

const playlistDetailsReducer = (state ={initialState}, action) =>
{
    switch(action.type) 
    {
      case 'SET_PLAYLIST_DETAILS' :
        {
            return ({
                ...state,
                details: action.payload
            })
        }

        case 'SET_PLAYLIST_ID' : 
        {
            return ({
                ...state,
                id: action.payload
            })
        }
        default :
        {
            return state;
        }
    }
}

export default  playlistDetailsReducer;