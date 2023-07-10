import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Shop from "./Shop";
import Contact from "./Contact";
import Register from "./Register";
import ArtDetail from "./ArtDetail";
import UserArtwork from "./UserArtwork";

function App() {
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState([]);

  const updateArtworks = (artworks) => {
    setArtworks(artworks);
  };
  const updateUser = (user) => {
    setUser(user);
  };

  const updateUserArtwork = (id) => {
    setUser(currentUser => (
      {...currentUser, artworks: currentUser.artworks.filter(artwork => (id !== artwork.id))}
    ))
  }

  useEffect(() => {
    const fetchUser = () => {
      fetch("/authenticate").then((res) => {
        if (res.ok) {
          res
            .json()
            .then(setUser);
        } else {
          updateUser(null);
        }
      });
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetch("/artworks")
      .then((res) => res.json())
      .then(setArtworks)
      .catch((err) => console.log(err));
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
          <Shop artworks={artworks} updateArtworks={updateArtworks} />
        </Route>
        <Route path="/user-artworks">
          <UserArtwork updateUserArtwork={updateUserArtwork} user={user} updateArtworks={updateArtworks}/>
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
