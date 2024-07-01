import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import auth from "./auth";

export const useLogInRedirect = () => { // redirect to login page if user is not logged in
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate('/login');
    }
  }, [navigate]);
};

export const useHandleNavLinkClick = () => {
  const navigate = useNavigate();

  const handleNavLinkClick = useCallback((event) => { // redirect to login page if user is not logged in when clicking on a nav link
    if (!auth.loggedIn()) {
      event.preventDefault(); 
      navigate('/login'); 
    }
  }, [navigate]);

  return handleNavLinkClick;
};