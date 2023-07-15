import { useEffect, useState, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../context/ErrorProvider";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const { setError } = useContext(ErrorContext);

  const handleLogin = () => {
    setIsLoggedIn((isLoggedIn) => !isLoggedIn);
  };

  const updateUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const fetchUser = () => {
      fetch("/authenticate").then((res) => {
        if (res.ok) {
          res.json().then(setUser);
        } else {
          updateUser(null);
        }
      });
    };
    fetchUser();
  }, []);

  const handleLogoutClick = () => {
    fetch("/logout", { method: "DELETE" }).then((res) => {
      if (res.ok) {
        updateUser(null);
        history.push("/authenticate");
      }
    });
  };

  const handleRegister = (values, resetForm, history) => {
    const { username, password, email } = values;
    const url = isLoggedIn ? "/login" : "/signup";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          updateUser(res);
        });
      } else {
        if (url === "/login") {
          setError("Incorrect Username or Password");
        } else {
          setError("Username already exists");
        }
      }
    });
  };
  return (
    <UserContext.Provider
      value={{
        handleLogin,
        handleRegister,
        updateUser,
        user,
        handleLogoutClick,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
