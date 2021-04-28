import firebase from "firebase";
import React, { useContext } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from './firabaseConfig';

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedUser,setLoggedUser]=useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const googleSignIn=()=>{
        const googlreProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(googlreProvider)
        .then((result) => {
            const user = result.user;
            setLoggedUser(user);
            history.replace(from);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    return (
        <div className='container'>
            <h1>Login</h1>
            <button className='btn btn-success' onClick={googleSignIn}>sign in with google</button>
        </div>
    );
};

export default Login;