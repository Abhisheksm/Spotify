const initialState ={
     items : {},
     isLoading: true
}

const featuredPlaylistReducer = (state= {initialState}, action) =>
{
    if(action.type === 'SET_FEATURED_PLAYLIST')
    {
        return{
            ...state,
            items: action.payload,
            isLoading: false
        }
    }
    else{
        return state;
    }
}

export default featuredPlaylistReducer;