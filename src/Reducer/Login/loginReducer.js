const initialState =
{
    token: ''
}

const loginReducer = (state = {initialState}, action) =>
{
    if (action.type === 'SET_TOKEN')
    {
        return {
            ...state,
            token: action.payload
        }
    }
    else{
        return state;
    }
}

export default loginReducer;