import React, { useState } from 'react';
import { FormGroup, FormControl,FormLabel, } from 'react-bootstrap';
import './Login.css'
import LoaderButton from './../components/loaderFile';
import Amplify, {Auth} from 'aws-amplify'
import config from "../config";
import { useHistory } from "react-router-dom";

const headerStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'serif',
    color: 'black',
};

Amplify.configure({
    Auth: {
        mandatorySignIn : true,
        region : config.cognito.REGION,
        userPoolId : config.cognito.USER_POOL_ID,
        identityPoolId : config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});



const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(email,password);
            alert('You Have Successfully Logged In !');
            sessionStorage.setItem("isAuthenticated",true);
            history.push('/signout');
        } catch (e) {
            alert(e.message);
            sessionStorage.setItem("isAuthenticated",false);
            setIsLoading(false);
        }
    };


        return (
            <div className= "Login">
            <h1 style={headerStyle}>
                NBSC SCHOOL SIGNOUT APPLICATION
            </h1>
                <div className="DivForm">
                    <form className="LoginForm" onSubmit={handleSubmit}>
                        <FormGroup className ='emailLabel' controlId = "email" contbssize="large">
                            <FormLabel className = 'email'>Userid/Emailid</FormLabel>
                            <FormControl autoFocus type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup className = 'passwordLabel' controlId="password" bssize="large">
                            <FormLabel className = 'password'>Password</FormLabel>
                            <FormControl type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                        <LoaderButton
                            className="LoaderButton"
                            bssize="large"
                            disabled={!validateForm()}
                            type="submit"
                            isLoading={isLoading}
                            text="Click For Login"
                            loadingText="Logging in…"
                            link to ="/signout"
                        />
                    </form>
                </div>
            </div>

        );
};

export default Login;