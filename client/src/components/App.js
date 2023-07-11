import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
  const history = useHistory()

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

  const handleLogoutClick = () => {
    fetch('/logout', {method: 'DELETE'})
    .then ((res) => {
      if (res.ok) {
        updateUser(null)
        history.push('/authenticate')
      }
    })
  }

  return (
    <main>
      <Navigation handleLogoutClick={handleLogoutClick} user={user} />
      <Register updateUser={updateUser} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/shop">
          <Shop artworks={artworks} updateArtworks={updateArtworks} />
        </Route>
        <Route path="/user-artworks">
          <UserArtwork updateUser={updateUser} updateUserArtwork={updateUserArtwork} user={user} updateArtworks={updateArtworks}/>
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
