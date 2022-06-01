import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routers/Auth";
import Tweets from "../routers/Tweets";
import Profile from "../routers/Profile";
import Tag from "../routers/Tag";

function AppRouter({ isLogin }: any, location: any) {
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Tweets />} />
            <Route path="tag/:tagId" element={<Tag />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="tag" element={<Tag />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
