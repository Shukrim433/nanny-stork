import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
    // a function that logs out user (onClick - logout button)
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div className="header-card">

        <div>
          <Link to="/">
            <h1>NANNY STORK</h1>  {/* refirects you to home page */}
          </Link>
        </div>

        <div>
            {/* if user is logged in, show "profile" btn and "logout" btn */}
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                profile     {/* redirects to profile page */}
              </Link>
              <button onClick={logout}>
                Logout
              </button>
            </>
          ) : ( /* else if user is logged out show "login" btn and "signup" btn */
            <>
              <Link to="/login">
                Login
              </Link>
              <Link to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>

      </div>

    </header>
  );
};

export default Header;
