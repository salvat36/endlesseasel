import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useHistory } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Navigation = () => {
  const history = useHistory();
  const { handleLogoutClick, user } = useContext(UserContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              fontFamily: "oswald",
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: "2px",
              color: "white",
            }}
          >
            EndLessEasel
          </Typography>

          <Link to="/">
            <Button
              sx={{
                color: "white",
                textDecoration: "none",
                padding: "8px 16px",
                margin: "0 4px",
                borderRadius: "4px",
                backgroundColor: "#9c27b0",
              }}
            >
              Home
            </Button>
          </Link>

          {user && (
            <Link to="/shop">
              <Button
                sx={{
                  color: "white",
                  textDecoration: "none",
                  padding: "8px 16px",
                  margin: "0 4px",
                  borderRadius: "4px",
                  backgroundColor: "#9c27b0",
                }}
              >
                Explore
              </Button>
            </Link>
          )}

          {user && (
            <Link to="/user-artworks">
              <Button
                sx={{
                  color: "white",
                  textDecoration: "none",
                  padding: "8px 16px",
                  margin: "0 4px",
                  borderRadius: "4px",
                  backgroundColor: "#9c27b0",
                }}
              >
                Portfolio
              </Button>
            </Link>
          )}

          {user && (
            <Link to="/create">
              <Button
                sx={{
                  color: "white",
                  textDecoration: "none",
                  padding: "8px 16px",
                  margin: "0 4px",
                  borderRadius: "4px",
                  backgroundColor: "#9c27b0",
                }}
              >
                Create
              </Button>
            </Link>
          )}

          <Link to="/contact">
            <Button
              sx={{
                color: "white",
                textDecoration: "none",
                padding: "8px 16px",
                margin: "0 4px",
                borderRadius: "4px",
                backgroundColor: "#9c27b0",
              }}
            >
              Contact
            </Button>
          </Link>

          {user && (
            <Link>
              <Button
                onClick={handleLogoutClick}
                sx={{
                  color: "white",
                  textDecoration: "none",
                  padding: "8px 16px",
                  margin: "0 4px",
                  borderRadius: "4px",
                  backgroundColor: "#9c27b0",
                }}
              >
                Logout
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
