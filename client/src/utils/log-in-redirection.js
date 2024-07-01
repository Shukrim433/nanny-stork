import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "./auth";


export const useLogInRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate('/login');
    }
  }, [navigate]);
};