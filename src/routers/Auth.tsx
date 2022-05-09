import React, { useState } from "react";
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

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  const onSignIn = () => {
    axios
      .post(
        "http://localhost:1234/register",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        alert("회원가입 성공");
      })
      .catch((res) => {
        if (res.response.status === 400) {
          alert(res.response.data.message);
        }
      });
  };

  const onLogin = () => {
    axios
      .post("http://localhost:1234/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const { accessToken } = response.data;

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        console.log(response);
        // accessToken을 localStorage, cookie 등에 저장하지 않는다!
      })
      .catch((error) => {
        // ... 에러 처리
      });
  };
  return (
    <>
      <div>Auth</div>
      <form onSubmit={onSubmit}>
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
        <button onClick={onSignIn}>SignIn</button>
        <button onClick={onLogin}>Login</button>
      </form>
    </>
  );
}

export default Auth;
