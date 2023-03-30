const initialState = {
    songs: []
}

const weekelySongsReducer = (state={initialState}, action) =>
{
   if(action.type === 'SET_WEEKELYSONGS')
   {
    return(
        {
            ...state,
            songs : action.payload
        }
    )
   }
   else{
    return state;
   }
}

export default weekelySongsReducer;