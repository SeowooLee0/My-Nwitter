import axios from "axios";
import { createContext } from "react";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppRouter from "./router";

import { socket, SocketContext } from "../socketio";

function App() {
  // useEffect(() => {
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:1234/refreshTokenRequest")
      .then((res) => {
        const { accessToken } = res.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        setIsLogin(true);
        if (res.data.data === null) {
          setIsLogin(false);
        }
        if (res.data.email) {
          socket.emit("login", { email: res.data.email, socketID: socket.id });
        }
      })
      .catch((error) => {
        // 로그인 페이지로 이동
        // ... 에러 처리
      });
  }, []);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <SocketContext.Provider value={socket}>
        <AppRouter isLogin={isLogin} />
      </SocketContext.Provider>
    </>
  );
}

export default App;
