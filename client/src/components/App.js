import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null)

  const updateUser = (user) => {
    setUser(user)
  }

  useEffect(() => {
    const fetchUser = () => {
      fetch('/authenticate')
        .then((res) => {
          if (res.ok) {
            res.json().then(updateUser);
          } else {
            updateUser(null);
          }
          })
    }
    fetchUser();
  }, []);

}
export default App;
