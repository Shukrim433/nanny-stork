import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuoteContainer from "../components/quote-container";
import Footer from "../components/Footer";
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
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { useTheme } from "../utils/ThemeContext";

import Auth from "../utils/auth";

const Signup = () => {
  const { pinkTheme, toggleTheme } = useTheme(); // theme changung functionality
  const themeStyles = pinkTheme
    ? {
        background: "#f48fb1",
        transitionProperty: "background-color",
        transitionDuration: "300ms",
      }
    : {
        background: "#90caf9",
        transitionProperty: "background-color",
        transitionDuration: "300ms",
      };

  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate("/me"); // Redirects user to profile page if logged in
    }
  }, [navigate]);

  // holds signup formState
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <QuoteContainer />
      <Card className="w-96 justify-center m-auto mt-20">
        <CardHeader
          style={themeStyles}
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <Input
                label="Username"
                size="lg"
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Email"
                size="lg"
                name="email"
                value={formState.email}
                onChange={handleChange}
                type="email"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Password"
                size="lg"
                name="password"
                value={formState.password}
                onChange={handleChange}
                type="password"
              />
            </div>
            <CardFooter className="pt-0">
              <Button fullWidth type="submit" style={themeStyles}>
                Sign Up
              </Button>
              {error && (
                <div className="text-red-500 mt-2">{error.message}</div>
              )}
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography
                    as="span"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold"
                  >
                    Log In
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
};
export default Signup;
