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
    const currentDateTime = date.toLocaleString();
    const studentDetails = { name: userInfo.username, time: currentDateTime };
    axios.post(api, studentDetails)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    alert('Your Sign Out Notification Has Been Sent To Your Admin. You Can Log Out now !')
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
        <h3 className="studentHeader">Welcome,{userInfo.username}</h3>
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
