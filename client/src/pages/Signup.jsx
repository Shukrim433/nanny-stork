import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth'; 

const Signup = () => {
    // holds signup formState 
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    })

    // ADD_USER mutation
    const [addUser, { error, data }] = useMutation(ADD_USER);

    // update formState based on what user inputs (OnChange event)
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    // OnSubmit create user using ADD_USER mutation using formState
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState }, // input formState (email, username, password) to create user
            })
            Auth.login(data.addUser.token)  
            //history.push('/');  // Redirect to the home page onsubmit (IF signup/addUser is successful)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <main className="signup-form-container">
            <div className="sigup-form-card">
                <h4 className="signup-form-header"> Sign up:</h4>
                <div className="signup-form-card-body">
                    {/* check if the "data" returned by the useMutation hook is truthy if yes "success" else display signup form */}
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                         </p>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <input
                            className="form-input"
                            placeholder="Your username"
                            name="username"
                            type="text"
                            value={formState.name}
                            onChange={handleChange}
                            />
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
                            Signup
                            </button>
                        </form>
                    )}
                    {/* check if the "error" returned by the useMutation hook is truthy if yes display error message*/}
                    {error && (
                        <div className="signup-form-error-msg">
                            {error.message}
                        </div>
                    )}
                </div>

            </div>

        </main>
    )

}
export default Signup;