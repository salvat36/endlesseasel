import { useEffect, useState, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Shop from "./Shop";
import Contact from "./Contact";
import Register from "./Register";
import ArtDetail from "./ArtDetail";
import Create from "./Create";
import UserArtwork from "./UserArtwork";
import { ErrorContext } from "../context/ErrorProvider";
import './app.css'

function App() {
  const [artworks, setArtworks] = useState([]);
  const { setError } = useContext(ErrorContext);

  const updateArtworks = (artworks) => {
    setArtworks(artworks);
  };

  useEffect(() => {
    fetch("/artworks")
      .then((res) => res.json())
      .then(setArtworks)
      .catch((error) => setError(error));
  }, [setError]);

  return (
    <main>
        <Navigation />
        <Register />
        <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/shop">
          <Shop artworks={artworks} updateArtworks={updateArtworks} />
        </Route>
        <Route path="/user-artworks">
          <UserArtwork updateArtworks={updateArtworks} artworks={artworks} />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/artworks/:id">
          <ArtDetail />
        </Route>
        <Route path="/create">
          <Create updateArtworks={updateArtworks} />
        </Route>
      </Switch>
      </div>
    </main>
  );
}
export default App;
