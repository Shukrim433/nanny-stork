import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth'; 

const Signup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (Auth.loggedIn()) {
            navigate('/me'); // Redirects user to profile page if logged in
        }
    }, [navigate]);

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
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <main className="flex justify-center items-center mt-10">
          <Card color="transparent" shadow={false} className="p-5">
            {data ? (
              <Typography color="green" className="text-center">
               
              </Typography>
            ) : (
              <>
                <Typography variant="h4" color="blue-gray" className="text-center">
                  Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 mb-4 font-normal text-center">
                  Nice to meet you! Enter your details to register.
                </Typography>
                <form onSubmit={handleFormSubmit} className="w-full max-w-screen-md">
                  <div className="mb-4 flex flex-col gap-4">
                    <Input
                      size="lg"
                      placeholder="Your username"
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                    <Input
                      size="lg"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                    <Input
                      size="lg"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    />
                  </div>
                  <Checkbox
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal"
                      >
                        I agree to the
                        <a
                          href="#"
                          className="font-medium transition-colors hover:text-gray-900"
                        >
                          &nbsp;Terms and Conditions
                        </a>
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                  />
                  <Button type="submit" className="mt-6" fullWidth>
                    Sign Up
                  </Button>
                  <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-gray-900">
                      Sign In
                    </Link>
                  </Typography>
                </form>
              </>
            )}
          </Card>
        </main>
      );

}
export default Signup;
