import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Login from './../components/Login';
require("./completeSignOut.css");

const SignOut = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    Auth.currentUserInfo().then(userInfo => setUserInfo(userInfo));
  }, []);

  const sendEmail = () => {
    const api = config.API.ApiEndPoint;
    const date = new Date();
    const currentDateTime = date.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' });
    const studentDetails = { name: userInfo.username, time: currentDateTime };
    axios.post(api, studentDetails)
      .then(response => {
          console.log();
        if(response.data.errorMessage === undefined){
            alert('Your Sign Out Notification Has Been Sent To Your Admin. You Can Log Out now !');
        }
        else {
            alert('Sign Out Notification Has Not Been Sent Out. Please Contact your Admin');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const logOut = () => {
    Auth.signOut();
    sessionStorage.setItem("isAuthenticated", false);
    history.push("/login");
  };

  let flag = sessionStorage.getItem("isAuthenticated");
  if (flag === 'true') {
    return (
      <div className="signOut">
        <h3 className="studentHeader">Hi {userInfo.username},
        </h3>
        <p className="WelcomeNote">Welcome To Signout Application.<br/>To Signout, click the "Complete Sign Out" Button
            <br/>Welcome An e-mail notification will be sent to school admin.</p>
        <button className="logButton" onClick={logOut}>
          Log Out
        </button>
        <button className="signButton" onClick={sendEmail}>
          Complete Sign Out
        </button>
      </div>
    );
  } else {
    history.push("/login");
    return Login;
  }
};

export default SignOut;
