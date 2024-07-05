import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Footer from '../components/Footer';
import QuoteContainer from '../components/quote-container';
import { useTheme } from '../utils/ThemeContext';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

export function Login() {

  const { pinkTheme, toggleTheme } = useTheme(); // theme changung functionality
  const themeStyles = pinkTheme
  ? { background: '#f48fb1' }
  : { background: '#90caf9' };

  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '', rememberMe: false });
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => { //if logged in redirect to profile page
    if (Auth.loggedIn()) {
      navigate('/me');
    }
  }, [navigate]);

  const handleChange = (event) => { //update formState based on user inputs
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => { //handles the changing of the checkbox
    setFormState({
      ...formState,
      rememberMe: event.target.checked,
    });
  };

  const handleFormSubmit = async (event) => { 
    event.preventDefault(); // prevent default form submission
    try {
      const { data } = await login({ //login user using the LOGIN_USER mutation
        variables: { ...formState }, // variables passed to the mutation (a copy of formState object)
      });

      Auth.login(data.login.token); // login user with the token returned from the mutation
      setFormState({ email: '', password: '', rememberMe: false }); // clear the form
    } catch (e) { // error handling
      console.error(e);
    }
  };

  return (
    <>
    <QuoteContainer />
    <Card className="w-96 justify-center m-auto mt-20 ">
      <CardHeader
        style={themeStyles}
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Log-In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <form onSubmit={handleFormSubmit}>
            <div className='mb-4'>
                <Input 
                    label="Email"
                    size="lg"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                />
          </div>
          <Input
                label="Password"
                size="lg"
                name="password"
                value={formState.password}
                onChange={handleChange}
                type="password"
          />
          <div className="-ml-2.5">
            <Checkbox
                label="Remember Me"
                name="rememberMe"
                checked={formState.rememberMe}
                onChange={handleCheckboxChange}
            />
          </div>
          <CardFooter className="pt-0">
            <Button fullWidth type="submit" style={themeStyles}>
                
              Sign In
            </Button>
            {error && (
              <div className="text-red-500 mt-2">
                {error.message}
              </div>
            )}
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Typography
                as="span"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </CardBody>
    </Card>
    <Footer />
    </>
  );
}

export default Login;