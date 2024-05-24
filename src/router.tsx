import React, { useEffect, useState } from "react";

import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Tweets from "./pages/Tweets";
import Profile from "./pages/Profile";
import Tag from "./pages/Tag";
import axios from "axios";
import Explore from "./pages/Explore";
import { is } from "immer/dist/internal";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Message from "./pages/Message";
import Bookmark from "./pages/Bookmark";

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
          <Route path="message" element={<Message />} />
          <Route path="bookmark" element={<Bookmark />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Auth />} />
          <Route path="/explore" element={<Navigate to={"/"} />} />
          <Route path="tag/:tagId" element={<Navigate to={"/"} />} />
          <Route path="/profile" element={<Navigate to={"/"} />} />
          <Route path="tag" element={<Navigate to={"/"} />} />
          <Route path="message" element={<Navigate to={"/"} />} />
          <Route path="bookmark" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
}

export default AppRouter;
