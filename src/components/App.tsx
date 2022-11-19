import axios from "axios";
// import "../components/App.scss";

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
    customAxios
      .get("/refreshTokenRequest")
      .then((res) => {
        if (res.data.email) {
          dispatch(changeState(true));
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
    <div>
      <SocketContext.Provider value={socket}>
        <AppRouter />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
