const initialState ={
    body : 'Home'
}

const BodyReducer =(state=initialState, action) =>
{
    if(action.type === 'SET_BODY')
    {
        return {
            body: action.payload
        }
    }
    else{
        return  state;
    }
}

export default BodyReducer;