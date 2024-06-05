import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false
  );
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  document.body.classList = isDark ? "body-dark" : "body";

  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <img
            src="./assets/icons/logo-home.svg"
            alt="logo"
            className="light"
          />
          <img
            src="./assets/icons/logo-login.svg"
            alt="logo"
            className="dark"
          />
        </Link>
        <label htmlFor="searchInp">
          <img src="./assets/icons/search.svg" alt="search" />
          <input
            type="text"
            id="searchInp"
            placeholder="Search books"
            onBlur={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => (e.key == "Enter" ? setSearch(e.target.value) : "")}
          />
        </label>
        <div>
          <div className="mode" onClick={() => setIsDark(!isDark)}>
            <CiLight className="light" />
            <MdDarkMode className="dark" />
          </div>
          <button
            onClick={() => {
              navigate("/auth/login");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  setSearch: PropTypes.func,
};
