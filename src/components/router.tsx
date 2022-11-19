import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  redirect,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Auth from "../routers/Auth";
import Tweets from "../routers/Tweets";
import Profile from "../routers/Profile";
import Tag from "../routers/Tag";
import axios from "axios";
import Explore from "../routers/Explore";
import { is } from "immer/dist/internal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function AppRouter() {
  const isLogin = useSelector(
    (state: RootState) => state.changeIsLogin.isLogin
  );
  return (
    <Routes>
      {isLogin ? (
        <>
          <Route path="/" element={<Tweets />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="tag/:tagId" element={<Tag />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="tag" element={<Tag />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Auth />} />
          <Route path="/explore" element={<Navigate to={"/"} />} />
          <Route path="tag/:tagId" element={<Navigate to={"/"} />} />
          <Route path="/profile" element={<Navigate to={"/"} />} />
          <Route path="tag" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
}

export default AppRouter;
