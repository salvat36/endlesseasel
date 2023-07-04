import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/shop">
        <button>Shop</button>
      </Link>
    </div>
  );
};

export default Home;
