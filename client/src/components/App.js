import { useEffect, useState, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Shop from "./Shop";
import Contact from "./Contact";
import Register from "./Register";
import ArtDetail from "./ArtDetail";
import UserArtwork from "./UserArtwork";
import UserProvider from "../context/UserProvider";
import ErrorProvider from "../context/ErrorProvider";

function App() {
  const [artworks, setArtworks] = useState([]);

  const updateArtworks = (artworks) => {
    setArtworks(artworks);
  };

  useEffect(() => {
    fetch("/artworks")
      .then((res) => res.json())
      .then(setArtworks)
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Switch>
        <ErrorProvider>
          <UserProvider>
            <Navigation />
            <Register />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/shop">
              <Shop artworks={artworks} updateArtworks={updateArtworks} />
            </Route>
            <Route path="/user-artworks">
              <UserArtwork
                updateArtworks={updateArtworks}
                artworks={artworks}
              />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/artworks/:id">
              <ArtDetail />
            </Route>
          </UserProvider>
        </ErrorProvider>
      </Switch>
    </main>
  );
}
export default App;
