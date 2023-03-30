export const setUserName = (name) => {
    return ({
        type: 'SET_USERNAME',
        payload: name
    })
}

export const setUserImage = (image) =>
{
    return ({
        type: 'SET_USERIMAGE',
        payload: image
    })
}

export const setUserEmail = (email) =>
{
    return ({
        type: 'SET_USEREMAIL',
        payload: email
    })
}

export const setURI =(uri) =>
{
    return ({
        type: 'SET_URI',
        payload: uri
    })
}