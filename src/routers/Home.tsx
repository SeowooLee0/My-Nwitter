import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

function Home() {
  const onClick = () => {
    signOut(auth);
  };
  return (
    <>
      <button onClick={onClick}>Logout</button>
      <div>Home</div>
    </>
  );
}

export default Home;
