import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppRouter from "./router";
import { useSelector, useDispatch } from "react-redux";

import { socket, SocketContext } from "../socketio";

import store, { RootState } from "../redux/store";
import { changeState } from "../redux/createSlice/IsLoginSlice";
import customAxios from "../CommonAxios";
import { changeAccessState } from "../redux/createSlice/GetAccessToken";

function App() {
  const isLogin = useSelector(
    (state: RootState) => state.changeIsLogin.isLogin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isLogin);
    customAxios
      .get("/refreshTokenRequest")
      .then((res) => {
        const { accessToken } = res.data;
        customAxios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        dispatch(changeAccessState(accessToken));
        dispatch(changeState(true));
        if (res.data.data === null) {
          dispatch(changeState(false));
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
  // const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <SocketContext.Provider value={socket}>
        <AppRouter isLogin={isLogin} />
      </SocketContext.Provider>
    </>
  );
}

export default App;
