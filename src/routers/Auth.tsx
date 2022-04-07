import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
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
  const [pw, setPw] = useState("");

  const onChange = (event: any) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPw(event.target.value);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Auth</h1>
      <div>
        <form>
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
            value={pw}
            onChange={onChange}
          />
          <button onClick={onSubmit} type="submit">
            SignIn
          </button>
        </form>
      </div>
      <button onClick={google}>Google</button>
      <button onClick={github}>Github</button>
    </>
  );
}

export default Auth;
