import React, { useState } from 'react'
import './login.css'
import spotify3 from '../../images/spotify3.png'
import { login, login_btn } from '../Constants'

const Login = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)
    const [error, setError] = useState('')
    const CLIENT_ID = "75658783e02648469097c33620049886";
    const REDIRECT_URI = "http://localhost:3000/home"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const REACT_APP_SCOPE = [
        "user-read-email",
        "user-read-private",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-position",
        "user-top-read",
        "streaming"
    ];
    const handleLogin = (e) => {
        e.preventDefault();
        setError('')
        setIsDisabled(false);
        
        if(!userName && !password)
         {
            setError('Please enter Username and Password!!')
            setIsDisabled(true)
        }
        else if (!userName) 
        {
            setError('Please enter Username!!')
        }
        else if (!password)
        {
            setError('Please enter Password!!')
        }
        else {
            window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${REACT_APP_SCOPE.join(" ")}&response_type=token`
        }
    }
    const handleUsername = (e) => {
        setUserName(e.target.value)
        if(userName.trim().length > 0 && password.trim().length > 0)
        {
            setIsDisabled(false)
        }
        
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        if(userName.trim().length > 0 && password.trim().length > 0)
        {
            setIsDisabled(false)
        }
    }

    return (
        <>
            <div className='login_container'>
                <div className='login_form_container'>
                    <div className='login-image'>
                        <img src={spotify3} alt='loginImage' />
                    </div>
                    <div className='login_form'>
                        <h5>{login}</h5>
                        <form>
                            <div className='input'>
                                <input type="email"
                                    name='username'
                                    id='username'
                                    placeholder='Username'
                                    value={userName}
                                    onChange={handleUsername}></input>
                            </div>
                            <div className='input'>
                                <input type="password"
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={handlePassword}></input>
                            </div>
                            <div className='login_btn'>
                                <button style={isDisabled ? {'backgroundColor':'rgb(139, 242, 139)'} : {'backgroundColor': 'rgb(22, 189, 22)'}}
                                onClick={handleLogin} type='submit' disabled={isDisabled}>{login_btn}</button>
                            </div>
                            <div className='error-msg'>{error}</div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
