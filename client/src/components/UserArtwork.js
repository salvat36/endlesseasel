import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UpdateUserForm from "./UpdateUserForm";
import { UserContext } from "../context/UserProvider";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";

const UserArtwork = () => {
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const { updateUser, user } = useContext(UserContext);

  const toggleForm = () => {
    setShowForm((showForm) => !showForm);
  };

  const handleDeleteUserArtwork = (id) => {
    fetch(`/user-artworks/${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        updateUserArtwork(id);
        alert("Successfully Deleted User-Book");
      }
    });
  };

  const handleDeleteUser = () => {
    fetch(`users/${user.id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        history.push("/");
        updateUser(null);
      } else {
        alert("Unable to delete user");
      }
    });
  };

  const updateUserArtwork = (id) => {
    updateUser({
      ...user,
      artworks: user.artworks.filter((artwork) => id !== artwork.id),
    });
  };

  const userArtworksList = user?.artworks.map((artwork) => (

    <React.Fragment key={artwork.id}>
     <Grid item >
      <Card>
        <CardMedia
                  component="img"
                  height="200"
                  image={artwork.image}
                  alt={artwork.title}
                />
             <CardContent>
                  <Typography variant="h6">{artwork.title}</Typography>
                </CardContent>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteUserArtwork(artwork.id)}>
                  Remove
                </Button>
              </Card>
            </Grid>
    </React.Fragment>
  ));

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4">Your Profile</Typography>
      </Grid>
      <Grid item>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image="https://images.nightcafe.studio/jobs/Qd58l3AQcSAYorblAGI0/Qd58l3AQcSAYorblAGI0--1--0qpm8.jpg?tr=w-1600,c-at_max"
            alt="Super sharp and crisp portrayal of a user profile"
          />
          <CardContent>
            <Typography variant="h6">Username: {user?.username} </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteUser}
        >
          Delete Profile
        </Button>
        <Button variant="contained" color="primary" onClick={toggleForm}>
          Edit Profile
        </Button>
        {showForm ? <UpdateUserForm toggleForm={toggleForm} /> : null}
      </Grid>
      <Grid item>
        <Typography variant="h2">Private Collection</Typography>
      </Grid>
      <Grid item>
        {userArtworksList}
      </Grid>
    </Grid>
  );
};

export default UserArtwork;
