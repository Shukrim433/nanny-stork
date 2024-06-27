import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    // login formState
    const [formState, setFormState] = useState({ email: '', password: '' });

    // LOGIN_USER mutation
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update formState based on what user inputs (OnChange event)
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    // OnSubmit login user using LOGIN_USER mutation using formState
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },  // use formState (email+password) to login user
            });

            Auth.login(data.login.token);
        } catch(e) {
            console.error(e)
        }

        // clear loginform values
        setFormState({
            email: '',
            password: '',
        });
    }

    return(
        <main className="login-form-container">
            <div className="login-form-card">
                <h3 className="login-form-header"> Login</h3>
                <div className="login-form-card-body">
                    {/* check if the "data" returned by the useMutation hook is truthy if yes "success" else display login form */}
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                className="form-input"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                />
                                <input
                                className="form-input"
                                placeholder="******"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                                />
                                <button
                                className="btn"
                                style={{ cursor: 'pointer' }}
                                type="submit"
                                >
                                Login
                                </button>
                            </form>
                        )}
                        {/* check if the "error" returned by the useMutation hook is truthy if yes display error message*/}
                        {error && (
                            <div className="login-form-error-msg">
                                {error.message}
                            </div>
                        )}
                </div>

            </div>
        </main>
    )
}

export default Login;