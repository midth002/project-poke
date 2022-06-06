import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './signup.css';
import {Button} from 'react-bootstrap';

const Signup = () => {
    const [formState, setFormState] = useState({
      userName: '',
      email: '',
      password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

      // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

  };

  return (
    <main className=" justify-center mb-4 container signup">
          <div className="flex-row content card justify-center col-md6 col-lg-5 wrap-signup">
              <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} className="signup-form">
              <span className='signup-form-title p-b-0 text-primary'>Create an account</span>
              <div className="validate-input form-input-wrap">
                <input
                  className="form-input"
                  // placeholder="Your username"
                  name="userName"
                  type="text"
                  value={formState.userName}
                  onChange={handleChange}
                  required
                /><label>Username</label>
                
                </div>
                <div className="validate-input form-input-wrap">
                <input
                  className="form-input"
                  name="email"
                  type="text"
                  value={formState.email}
                  onChange={handleChange}
                  required
                /><label>Email</label></div>
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
                  <div className="signup-error">
                    {error.message}
                  </div>
                )}
                <Button
                  className="btn btn-block btn-info signup-btn"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Create Account
                </Button>
               
                <p className="sign-up-link">
                Already have an account? <Link to="/login">Login instead</Link>
                  </p>
              </form>
            )}
          </div>
        </div>
    </main>
  );
};
export default Signup;



