import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Shop from "./Shop";
import Profile from "./Profile";
import Contact from "./Contact";

function App() {
  const [user, setUser] = useState(null);

  const updateUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const fetchUser = () => {
      fetch("/authenticate").then((res) => {
        if (res.ok) {
          res.json().then(updateUser);
        } else {
          updateUser(null);
        }
      });
    };
    fetchUser();
  }, []);

  return (
    <main>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </main>
  );
}
export default App;
