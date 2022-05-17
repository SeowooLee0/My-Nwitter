import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routers/Auth";
import Tweets from "../routers/Tweets";
import Profile from "../routers/Profile";

function AppRouter({ isLogin }: any) {
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Tweets />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
