import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";
import Profile from "../routers/Profile";
import Nevigation from "../routers/Nevigation";

function AppRouter({ isLogin }: any) {
  return (
    <BrowserRouter>
      {/* {isLogin && <Nevigation />} */}
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
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
