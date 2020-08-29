import React from 'react';
import { Button } from '@material-ui/core';

import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import './Login.css';

const Login = () => {
  const [state, dispatch] = useStateValue();

  const signIn = async () => {
    try {
      const res = await auth.signInWithPopup(provider);
      const user = res.user;

      dispatch({ type: actionTypes.SET_USER, payload: user });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='login'>
      <div className='login__logo'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
          alt='fb_logo'
        />
        <img
          src='https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg'
          alt='facebook'
        />
      </div>
      <Button type='submit' onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
};

export default Login;
