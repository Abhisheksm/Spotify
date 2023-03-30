const initialstate ={
    search: "",
    type: "track",
    track: [],
    album: [],
    artist: []
}

const searchReducer =(state =initialstate, action) =>
{
    switch(action.type)
    {
        case 'SET_SEARCH_INPUT' :
            {
                return {
                    ...state,
                    search: action.payload
                }
            }

        case 'SET_SEARCH_TYPE' :
            {
                return {
                    ...state,
                    type: action.payload
                }
            }

        case 'SET_SEARCH_TRACK' :
            {
                return {
                    ...state,
                    track: action.payload
                }
            }

        case 'SET_SEARCH_ARTIST':
            {
                return {
                    ...state,
                    artist: action.payload
                }
            }

        case 'SET_SEARCH_ALBUM' :
            {
                return {
                    ...state,
                    album: action.payload
                }
            }
            
        default :
        {
            return state
        }
    }
}

export default searchReducer;