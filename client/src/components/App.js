import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Shop from "./Shop";
import Profile from "./UserArtwork";
import Contact from "./Contact";
import Register from "./Register";
import ArtDetail from "./ArtDetail";
import UserProfile from "./UserArtwork";
import UserArtwork from "./UserArtwork";

function App() {
  const [user, setUser] = useState(null);

  const updateUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const fetchUser = () => {
      fetch("/authenticate").then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) =>
              updateUser(
                data?.user_artworks ? data : { ...data, user_artworks: [] }
              )
            );
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
      <Register updateUser={updateUser} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/profile">
          <UserArtwork />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/artworks/:id">
          <ArtDetail updateUser={updateUser} user={user} />
        </Route>
      </Switch>
    </main>
  );
}
export default App;
