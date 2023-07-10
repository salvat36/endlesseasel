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

  useEffect(() => {
    fetch("/artworks")
      .then((res) => res.json())
      .then(setArtworks)
      .catch((err) => console.log(err));
  }, []);

  const removeUser = (user) => {
    setUser((currentUser) => {
      if (currentUser.user) {
        return {...currentUser, user: currentUser.filter((otherUser) => otherUser.id !== user.id)}
      }
    })
  }

  
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
          <UserArtwork user={user} updateArtworks={updateArtworks}/>
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
