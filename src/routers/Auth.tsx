import React, { useRef, useState } from "react";
import axios from "axios";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onClick = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:1234/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        alert("회원가입 성공");
      })
      .catch((res) => {
        if (res.response.status === 400) {
          alert(res.response.data.message);
        }
      });
  };

  return (
    <>
      <div>Auth</div>
      <form>
        <input
          placeholder="EMAIL"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          placeholder="PW"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button onClick={onClick}>Login</button>
      </form>
    </>
  );
}

export default Auth;
