import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebase } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const google = () => {
  signInWithPopup(auth, googleProvider);
};
const github = () => {
  signInWithPopup(auth, githubProvider);
};

// const singIn = () => {
//   createUserWithEmailAndPassword(auth, email , passward);
// };

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event: any) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (signIn) {
      signInWithEmailAndPassword(auth, email, password);
    } else {
      createUserWithEmailAndPassword(auth, email, password).catch(
        (error: any) => {
          console.log(error.message);
        }
      );
    }
  };
  const [signIn, setSignIn] = useState(false);

  return (
    <>
      <h1>Auth</h1>
      <div>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Email"
            name="email"
            required
            onChange={onChange}
            value={email}
          />
          <input
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <button type="submit">{signIn ? "Login" : "Create ID"}</button>
        </form>
      </div>
      <button onClick={google}>Google</button>
      <button onClick={github}>Github</button>
    </>
  );
}

export default Auth;
