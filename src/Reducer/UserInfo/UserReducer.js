const initialState = {
    name: '',
    image: '',
    email: '',
    uri: ''
}

const userInfoReducer = (state = {initialState}, action) =>
{
    switch(action.type)
    {
        case 'SET_USERNAME':
            {
                return {
                    ...state,
                    name: action.payload
                }
            }
        
        case 'SET_USERIMAGE' :
            {
                return {
                    ...state,
                    image: action.payload
                }
            }

        case 'SET_USEREMAIL' :
            {
                return {
                    ...state,
                    email: action.payload
                }
            }

            case 'SET_URI' :
                {
                    return {
                        ...state,
                        uri: action.payload
                    }
                }
            
         default :
         {
            return state
         }
    }
}

export default userInfoReducer;