import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import './login.css';
import pokeBowl from '../assets/download.jpg'; 


import {Button} from 'react-bootstrap';

import Auth from '../utils/auth';

const Login = () => {
    const [formState, setFormState] = useState({ 
      email: '', 
      password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data)
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

  
     setFormState({
        email: '',
        password: '',
      });
    };
    return (
        <main className=" justify-center mb-4 container login">
          <div className="flex-row content card justify-center col-md6 col-lg-5 wrap-login">
              <div className="card-body">
                {data ? (
                  <p>
                    {/* Success! You may now head{' '} */}
                    <Link to="/menu">You are logged in</Link>
                  </p>
                ) : (
                  <form onSubmit={handleFormSubmit} className="login-form">
                  <span className='login-form-title p-b-26 text-primary'>Login</span>
                 
                  <div className="validate-input form-input-wrap">
                    <input
                      className="form-input rounded-left"
                      name="email"
                      type="text"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    /><label>Email Address</label>
                    </div>
                    <div className="validate-input form-input-wrap">
                    <input
                      className="form-input"
                     
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                      required
                    /><label>Password</label>
                    </div>
                      {error && (
                  <div className="login-error">
                    {error.message}
                  </div>
                )}
                    <div className="login-btn-form">
                    <Button
                      className="btn btn-block btn-info login-btn"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      LOGIN
                    </Button>
                    </div>
                  
                  <div>
                  <p className="sign-up-link">Don't have an account? <Link to="/signup">Signup instead</Link></p>
                  </div>
                  </form>
                  
                )}
              
              </div>
            </div>
       
        </main>
      );
    };
    export default Login;