import React from "react";
import { Link } from "react-router-dom";

function Nevigation() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  );
}

export default Nevigation;
